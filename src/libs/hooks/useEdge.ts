import { useCallback, useEffect } from 'react'

import cuid from 'cuid'
import useSWR from 'swr'

import useAirport from './useAirport'
import useCompany from './useCompany'

import type { EdgeState, PointState } from '@types'

const initialEdge: EdgeState = {}

const useEdge = () => {
  const { data: points, setAirport } = useAirport()
  const { addMoney } = useCompany()
  const { data, mutate } = useSWR('edge', null, { fallbackData: initialEdge })

  const addEdge = useCallback(
    (start: string, end: string) => {
      if (data) {
        const isExist =
          Object.values(data).filter((v) => v.start === start && v.end === end).length > 0
        if (!isExist && points) {
          const key = `edge-${cuid()}`
          mutate({ ...data, [key]: { start, end } })
          localStorage.setItem(key, JSON.stringify({ start, end }))
          setAirport(start, { ...points[start], connect: [...points[start].connect, end] })
          addMoney(-10)
        }
      }
    },
    [data, mutate, points, setAirport, addMoney],
  )

  // const removeEdge = useCallback(
  //   (start: string, end: string) => {
  //     if (data) {
  //       const edge = Object.entries(data).filter((v) => v[1].start === start && v[1].end === end)[0]
  //       if (edge) {
  //         delete data[edge[0]]
  //         localStorage.removeItem(edge[0])
  //         mutate(data)
  //       }
  //     }
  //   },
  //   [data, mutate],
  // )
  const resetEdge = useCallback(() => {
    mutate(initialEdge)
    Object.keys(localStorage)
      .filter((v) => v.includes('edge'))
      .map((v) => {
        localStorage.removeItem(v)
      })
  }, [mutate])

  useEffect(() => {
    window.addEventListener('load', () => {
      const d = Object.fromEntries(
        Object.entries<string>(localStorage)
          .filter((v) => v[0].includes('edge'))
          .map(([k, v]) => [k, JSON.parse(v)]),
      )
      if (Object.keys(d).length !== 0) mutate(d)
    })
  })

  return { data, addEdge, resetEdge }
}

export default useEdge
