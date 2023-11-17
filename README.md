# Location · [![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/sswahn/location/blob/main/LICENSE) ![npm version](https://img.shields.io/npm/v/@sswahn/location)

This JavaScript library provides convenient methods for working with AWS Location Service, including functions for getting directions and reverse geocoding.  

## Features
- **Get Directions:** Calculate the route between two sets of coordinates with ease. Use the `getDirections` function to retrieve the path from a start location to a destination.
- **Reverse Geocoding:** Perform reverse geocoding by providing coordinates, and get detailed address information in return. Utilize the `reverseGeocode` function to obtain an address based on a set of coordinates.
- **Convenient Integration:** Seamlessly integrate with AWS Location Service, making it easy to leverage powerful geospatial capabilities in your Node.js applications.
- **Simple and Readable:** The library is designed with simplicity in mind, offering clear and readable methods for working with location-based services.


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
