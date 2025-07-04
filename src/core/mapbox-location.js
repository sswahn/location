import { useState, useContext, useEffect } from 'react'
import { Context } from '../../Provider'

/*
Set restrictions on public token:

  ✅ Enable only the APIs you need (e.g. Geocoding, Maps).

  ✅ Add your domain for domain restricting (e.g. https://myapp.com).

  ✅ Optionally allow http://localhost:3000 for local dev.
*/

const MAPBOX_TOKEN = 'YOUR_MAPBOX_PUBLIC_ACCESS_TOKEN'

const LocationAutocomplete = () => {
  const [context, dispatch] = useContext(Context)
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(null)

  const getLocations = async controller => {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`, { 
        signal: controller.signal
      })
      const json = await response.json()
      setData(json.features || [])
    } catch (error) {
      console.error(error)
    }
  }

  const handleSelect = location => {
    dispatch({ type: 'location', payload: location })
    storage.local.set('location', location) // need to import lib
    setSelected(location)
    setQuery(location.place_name)
    setData([])
  }
  
  useEffect(() => {
    if (!query) {
      return setData([])
    }
    const controller = new AbortController()
    const timeout = setTimeout(() => getLocations(controller), 300) // Debounce query changes
    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [query])

  return (
    <div className="w-full max-w-md mx-auto mt-10 relative">
      <input className="w-full p-2 border border-gray-300 rounded" type="text" value={query} placeholder="Search for a location" onChange={({ target: { value } }) => setQuery(value)} />
      {data.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 max-h-60 overflow-auto">
          {data.map(location => (
            <li key={location.id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect(location)}>
              {location.place_name}
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
  )
}

export default LocationAutocomplete
