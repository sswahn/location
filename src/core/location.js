import { LocationClient, CalculateRouteCommand, GetAddressCommand } from "@aws-sdk/client-location"

const location = {
  async getDirections(startCoordinates, destinationCoordinates) {
    try {
      const startLocation = {
        Latitude: startCoordinates.lat,
        Longitude: startCoordinates.lng
      }
      const destinationLocation = {
        Latitude: destinationCoordinates.lat,
        Longitude: destinationCoordinates.lng
      }
      const values = {
        CalculatorName: 'Default',
        DepartNow: true,
        Positions: [startLocation, destinationLocation]
      }
      const locationClient = new LocationClient()
      const command = new CalculateRouteCommand(values)
      return locationClient.send(command) // Extract the path from the response: const path = response?.CalculatedRoute?.Geometry?.Path;
    } catch (error) {
      throw new Error(`getDirections: ${error}`)
    }
  },
  async reverseGeocode(coordinates) {
    try {
      const values = {
        Position: {
          Latitude: coordinates.lat,
          Longitude: coordinates.lng
        }
      }
      const locationClient = new LocationClient() 
      const command = new GetAddressCommand(values)
      return locationClient.send(command)  // Extract the address from the response: const address = response?.Address?.Label
    } catch (error) {
      throw new Error(`reverseGeocode: ${error}`)
    }
  }
}

export default location
