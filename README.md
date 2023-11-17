# Location · [![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/sswahn/location/blob/main/LICENSE) ![npm version](https://img.shields.io/npm/v/@sswahn/location)

This JavaScript library provides convenient methods for working with AWS Location Service, including functions for getting directions and reverse geocoding.  

## Installation

Using npm.
```bash
npm install @sswahn/location
```

## Usage

Import location.
```javascript
import location from '@sswahn/location'
```

### Get Directions
```javascript
const startCoordinates = { lat: 37.7749, lng: -122.4194 }
const destinationCoordinates = { lat: 34.0522, lng: -118.2437 }

const path = await location.getDirections(startCoordinates, destinationCoordinates)
```

### Reverse Geocode
```javascript
const targetCoordinates = { lat: 40.7128, lng: -74.0060 }

const address = await location.reverseGeocode(targetCoordinates)
```


## License
Location is [MIT Licensed](https://github.com/sswahn/location/blob/main/LICENSE)
