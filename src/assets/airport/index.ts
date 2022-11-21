import airport from '@assets/airport/C28-21_Airport.json'

export type AirportName = keyof typeof airport.points
export const AirportNames = Object.keys(airport.points) as AirportName[]

export default airport.points
