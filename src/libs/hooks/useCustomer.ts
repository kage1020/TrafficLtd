import { useCallback } from 'react'

import useAirport from './useAirport'
import useCompany from './useCompany'

import type { CustomerState, PointState } from '@types'

const useCustomer = () => {
  const { data, setAirport } = useAirport()
  const { addMoney } = useCompany()

  const updateCustomer = useCallback(() => {
    if (data) {
      const points = Object.entries(data ?? {}).filter((v) => v[1].show)
      if (points.length === 0) return

      const cs = {} as { [key: string]: CustomerState[] }
      for (const p of points) {
        for (const c of p[1].customers) {
          const [dist, ...others] = c.path
          if (!dist) continue
          if (dist in p[1].connect) {
            addMoney(1)
            cs[dist] = [...(cs[dist] ?? []), { ...c, path: others }]
          }
        }
      }
      for (const p of points) {
        setAirport(p[0], { ...p[1], customers: cs[p[0]] ?? [] })
      }
    }
  }, [data, setAirport, addMoney])

  const updatePath = useCallback(() => {
    if (data) {
      const points = Object.entries(data ?? {}).filter((v) => v[1].show)
      if (points.length === 0) return

      for (const p of points) {
        const cs: CustomerState[] = []
        for (const c of p[1].customers) {
          let queue: string[] = []
          const start = c.place
          const end = c.target
          let next = start
          const customer: CustomerState = {
            place: start,
            target: end,
            path: [],
          }

          while (next !== end) {
            if (next === '' || end in data[next].connect) break

            queue = Array.from(new Set([...queue, ...data[next].connect]))
            next = queue.pop() ?? ''
            if (next === '') break
            customer.path.push(next)
          }
          if (next !== '') customer.path.push(next)
          cs.push(customer)
        }
        setAirport(p[0], { ...p[1], customers: cs })
      }
    }
  }, [data, setAirport])

  const getCustomer = useCallback(() => {
    const points = Object.entries(data ?? {}).filter((v) => v[1].show)
    if (points.length <= 1) return {} as CustomerState
    let queue: string[] = []
    let start, end: string

    do {
      start = points[Math.floor(Math.random() * points.length)][0]
      end = points[Math.floor(Math.random() * points.length)][0]
    } while (start === end)

    const customer: CustomerState = {
      place: start,
      target: end,
      path: [],
    }

    if (!data) return customer
    let next = start

    while (next !== end) {
      if (next === '' || end in data[next].connect) break

      queue = Array.from(new Set([...queue, ...data[next].connect]))
      next = queue.pop() ?? ''
      if (next === '') break
      customer.path.push(next)
    }

    if (next !== '') customer.path.push(next)

    return customer
  }, [data])

  return { getCustomer, updatePath, updateCustomer }
}

export default useCustomer
