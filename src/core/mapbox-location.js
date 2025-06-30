import React, { useState, useEffect } from "react";

const MAPBOX_TOKEN = "YOUR_MAPBOX_ACCESS_TOKEN";

export default function LocationAutocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  // Debounce query changes
  useEffect(() => {
    if (!query) return setResults([]);

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setResults(data.features || []);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const handleSelect = (place) => {
    setSelected(place);
    setQuery(place.place_name);
    setResults([]);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 relative">
      <input
        type="text"
        value={query}
        placeholder="Search for a location"
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 max-h-60 overflow-auto">
          {results.map((place) => (
            <li
              key={place.id}
              onClick={() => handleSelect(place)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {place.place_name}
            </li>
          ))}
        </ul>
      )}
      {selected && (
        <div className="mt-4 text-sm text-gray-600">
          Selected: {selected.place_name}
        </div>
      )}
    </div>
  );
}
