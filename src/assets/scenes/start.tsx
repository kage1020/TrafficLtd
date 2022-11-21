import { Fragment } from 'react'

import clsx from 'clsx'

import { NeonBox, NeonText } from '@components/neon'
import useAirport from '@libs/hooks/useAirport'
import useEdge from '@libs/hooks/useEdge'
import useMode from '@libs/hooks/useMode'
import useScene from '@libs/hooks/useScene'
import useSystem from '@libs/hooks/useSystem'

import type { ModeType } from '@types'

type ButtonTypes = {
  key: ModeType | 'clear'
  text: string
}[]

const modes: ButtonTypes = [
  { key: 'management', text: '経営モード' },
  // { key: 'free', text: 'フリープレイ' },
  // { key: 'plane', text: '飛行機モード' },
  // { key: 'train', text: '電車モード' },
  // { key: 'bus', text: 'バスモード' },
  // { key: 'ship', text: '船モード' },
  { key: 'clear', text: 'ゲームを初期化する' },
]

const StartScene = () => {
  const { setTime, resetSystem } = useSystem()
  const { setMode } = useMode()
  const { setScene } = useScene()
  const { resetAirport } = useAirport()
  const { resetEdge } = useEdge()

  const startGame = (mode: ModeType) => {
    setMode(mode)
    setScene('play')
  }

  const resetGame = () => {
    const res = window.confirm('本当に初期化しますか？')
    if (res) {
      setTime(0)
      resetAirport()
      resetSystem()
      resetEdge()
    }
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex items-center pb-16'>
        <NeonText className='text-8xl text-blue-400'>Traffic Ltd.</NeonText>
      </div>
      <div className='grid grid-cols-2'>
        <NeonText className='col-span-2 block p-6 text-center text-xl text-red-500 md:hidden'>
          スマホやタブレットには非対応です。
        </NeonText>
        {modes.map((mode) => (
          <Fragment key={mode.key}>
            <div
              className='mx-6 my-4 cursor-pointer'
              key={mode.key}
              onClick={() => (mode.key === 'clear' ? resetGame() : startGame(mode.key))}
            >
              <NeonBox
                className={clsx(
                  'flex justify-center p-6 text-xl font-bold',
                  mode.key === 'clear' ? 'hover:text-red-500' : 'hover:text-green-500',
                )}
              >
                {mode.text}
              </NeonBox>
            </div>
          </Fragment>
        ))}
        <a
          href='https://forms.gle/A35vZpjUx3gfV6EK8'
          target='_blank'
          rel='noreferrer'
          className='col-span-2 m-6'
        >
          <NeonBox className='p-6 text-center text-orange-500'>
            ゲームの改善のため、アンケートにご協力ください。
          </NeonBox>
        </a>
      </div>
    </div>
  )
}

export default StartScene
