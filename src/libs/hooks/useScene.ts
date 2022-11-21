import { useCallback } from 'react'

import useSWR from 'swr'

import type { SceneType } from '@types'

const useScene = () => {
  const { data, mutate } = useSWR<SceneType>('scene', null, { fallbackData: 'start' })

  const setScene = useCallback(
    (scene: SceneType) => {
      mutate(scene)
      localStorage.setItem('scene', scene)
    },
    [mutate],
  )

  return { data, setScene }
}

export default useScene
