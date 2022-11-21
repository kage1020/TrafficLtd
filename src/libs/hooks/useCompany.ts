import { useCallback, useEffect } from 'react'

import useSWR from 'swr'

type CompanyState = {
  customers: number
  money: number
}

const initialCompany: CompanyState = {
  customers: 0,
  money: 0,
}

const useCompany = () => {
  const { data, mutate } = useSWR('company', null, { fallbackData: initialCompany })

  const setCustomers = useCallback(
    (customers: number) => {
      mutate({ customers: customers, money: data?.money ?? 0 })
      localStorage.setItem('company', JSON.stringify(data))
    },
    [mutate, data],
  )
  const addMoney = useCallback(
    (money: number) => {
      if (data) mutate({ customers: data.customers ?? 0, money: data.money + money })
      localStorage.setItem('company', JSON.stringify(data))
    },
    [mutate, data],
  )

  useEffect(() => {
    window.addEventListener('load', () => {
      const d = localStorage.getItem('company')
      if (d) mutate(JSON.parse(d))
      else localStorage.setItem('company', JSON.stringify(initialCompany))
    })
  }, [mutate])

  return { data, setCustomers, addMoney }
}

export default useCompany
