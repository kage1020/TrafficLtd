import type { PointName } from '@assets'
import type { LatLngTuple } from 'leaflet'

export type ModeType = 'management' | 'free' | 'plane' | 'train' | 'bus' | 'ship'

export type SceneType = 'play' | 'start' | 'result'

export type VehicleType = 'airport' | 'bus' | 'port' | 'train'

export type CustomerState = {
  place: string | 'moving'
  target: string
  path: string[]
}

export type PointState = {
  type: VehicleType
  name: PointName
  coordinates: LatLngTuple
  connect: string[]
  show: boolean
  customers: CustomerState[]
}

export type EdgeState = {
  [key: string]: {
    start: string
    end: string
  }
}

export type SystemState = {
  time: number
  first: string | null
  second: string | null
  money: number
  customers: number
}
