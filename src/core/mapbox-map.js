// App.jsx or index.js
import 'mapbox-gl/dist/mapbox-gl.css'
/////////////////////////////////////

import{ useContext, useRef, useEffect } from 'react'
import { Context } from '../../Provider'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'

const MapDisplay = () => {
  const [context, dispatch] = useContext(Context)
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null);

  const loadMap = () => {
    if (!context.location) {
      return
    }
    const center = context.location.center
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center,
        zoom: 12,
      })
      return
    } 
    mapRef.current.flyTo({ center, zoom: 12 })
    if (mapRef.current) {
      markerRef.current.remove() // Remove previous marker
    }
    markerRef.current = new mapboxgl.Marker().setLngLat(center).addTo(mapRef.current) // Add new marker
  }
  
  useEffect(() => {
    loadMap()
  }, [context.location])

  return (
    <div className="w-full h-96 mt-4 rounded border" ref={mapContainerRef} />
  )
}

export default MapDisplay
