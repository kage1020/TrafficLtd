import { useCallback, useEffect } from 'react'

import useSWR from 'swr'

import type { ModeType } from '@types'

const useMode = () => {
  const { data, mutate } = useSWR<ModeType>('mode', null, { fallbackData: 'management' })

  const setMode = useCallback(
    (mode: ModeType) => {
      mutate(mode)
      localStorage.setItem('mode', JSON.stringify(mode))
    },
    [mutate],
  )

  useEffect(() => {
    const d = localStorage.getItem('mode')
    if (d) mutate(d as ModeType)
  }, [mutate])

  return { data, setMode }
}

export default useMode
