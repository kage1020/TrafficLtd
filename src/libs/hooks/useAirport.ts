import { useCallback, useEffect } from 'react'

import cuid from 'cuid'
import useSWR from 'swr'

import { airport } from '@assets'

import type { PointName } from '@assets'
import type { CustomerState, PointState, VehicleType } from '@types'
import type { LatLngTuple } from 'leaflet'

const initialAirport = Object.fromEntries(
  Object.entries(airport).map(([key, value]: [string, number[]]) => [
    `airport-${cuid()}`,
    {
      type: 'airport' as VehicleType,
      name: key as PointName,
      coordinates: value as LatLngTuple,
      connect: [] as string[],
      show: key === '成田国際空港' || key === '那覇空港',
      customers: [] as CustomerState[],
    },
  ]),
)

const useAirport = () => {
  const { data, mutate } = useSWR('airport', null, {
    fallbackData: initialAirport,
  })
  const setAirport = useCallback(
    (key: string, value: PointState) => {
      if (data) {
        mutate({ ...data, [key]: value })
        localStorage.setItem(`airport-${key}`, JSON.stringify(value))
      }
    },
    [mutate, data],
  )
  const showRandomAirport = useCallback(() => {
    const candidates = Object.entries(data ?? {}).filter((v) => !v[1].show)
    const point = candidates[Math.floor(Math.random() * candidates.length)]
    if (point) {
      mutate({ ...data, [point[0]]: { ...point[1], show: true } })
      localStorage.setItem(point[0], JSON.stringify({ ...point[1], show: true }))
    }
    return point
  }, [data, mutate])
  const addCustomer = useCallback(
    (key: string, customer: CustomerState) => {
      if (data)
        mutate({ ...data, [key]: { ...data[key], customers: [...data[key].customers, customer] } })
    },
    [data, mutate],
  )

  const resetAirport = useCallback(() => {
    mutate(initialAirport)
    Object.entries(initialAirport).map((p) => {
      localStorage.setItem(p[0], JSON.stringify(p[1]))
    })
  }, [mutate])

  useEffect(() => {
    window.addEventListener('load', () => {
      const d = Object.fromEntries(
        Object.entries<string>(localStorage)
          .filter((v) => v[0].includes('airport'))
          .map(([k, v]) => [k, JSON.parse(v)]),
      )
      if (Object.keys(d).length !== 0) mutate(d)
      else
        Object.entries(initialAirport).map((p) => localStorage.setItem(p[0], JSON.stringify(p[1])))
    })
  }, [mutate])

  return { data, setAirport, showRandomAirport, resetAirport, addCustomer }
}

export default useAirport
