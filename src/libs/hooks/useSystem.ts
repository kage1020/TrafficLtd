import { useCallback, useEffect } from 'react'

import useSWR from 'swr'

import useAirport from './useAirport'

import type { PointState, SystemState } from '@types'

const initialSystem: SystemState = {
  time: 0,
  first: null,
  second: null,
  money: 100,
  customers: 0,
}

const useSystem = () => {
  const { data: airport } = useAirport()
  const { data, mutate } = useSWR('system', null, { fallbackData: initialSystem })

  const setTime = useCallback(
    (time: number) => {
      if (data) mutate({ ...data, time: time })
      localStorage.setItem('system', JSON.stringify(data))
    },
    [mutate, data],
  )
  const setPoint = useCallback(
    (point: string | null) => {
      if (data) {
        if (point === null) mutate({ ...data, first: null, second: null })
        else if (data.first === null) mutate({ ...data, first: point })
        else mutate({ ...data, second: point })
      }
      localStorage.setItem('system', JSON.stringify(data))
    },
    [mutate, data],
  )
  const addMoney = useCallback(
    (money: number) => {
      if (data) {
        mutate({ ...data, money: data.money + money })
        localStorage.setItem('system', JSON.stringify({ ...data, money: data.money + money }))
      }
    },
    [data, mutate],
  )
  const payMoney = useCallback(
    (money: number) => {
      if (data) {
        mutate({ ...data, money: data.money - money })
        localStorage.setItem('system', JSON.stringify({ ...data, money: data.money - money }))
      }
    },
    [data, mutate],
  )
  const addCustomers = useCallback(
    (customers: number) => {
      if (data) {
        mutate({ ...data, customers: data.customers + customers })
        localStorage.setItem(
          'system',
          JSON.stringify({ ...data, customers: data.customers + customers }),
        )
      }
    },
    [data, mutate],
  )
  const updateCustomerCount = useCallback(() => {
    if (data && airport) {
      const num = Object.values(airport)
        .filter((v) => v.show)
        .reduce((acc, cur) => acc + cur.customers.length, 0)
      mutate({ ...data, customers: num })
    }
  }, [airport, mutate, data])
  const resetSystem = useCallback(() => {
    mutate(initialSystem)
  }, [mutate])

  useEffect(() => {
    window.addEventListener('load', () => {
      const d = localStorage.getItem('system')
      if (d) mutate({ ...JSON.parse(d), point: null })
      else localStorage.setItem('system', JSON.stringify(initialSystem))
    })
  }, [mutate])

  return {
    data,
    setTime,
    setPoint,
    addMoney,
    payMoney,
    addCustomers,
    resetSystem,
    updateCustomerCount,
  }
}

export default useSystem
