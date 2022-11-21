import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import { useStopwatch } from 'react-timer-hook'

import { ArrowIcon, SettingIcon } from '@components/icon'
import { NeonBox } from '@components/neon'
import useAirport from '@libs/hooks/useAirport'
import useCompany from '@libs/hooks/useCompany'
import useCustomer from '@libs/hooks/useCustomer'
import useEdge from '@libs/hooks/useEdge'
import useScene from '@libs/hooks/useScene'
import useSystem from '@libs/hooks/useSystem'
import { calcTime } from '@libs/tools'

import type { PointState } from '@types'
const Map = dynamic(() => import('@components/map'), { ssr: false })

const PlayScene = () => {
  const { setScene } = useScene()
  const { data: system, setTime, addCustomers, updateCustomerCount } = useSystem()
  const { data: company } = useCompany()
  const { data: airport, showRandomAirport, addCustomer } = useAirport()
  const { getCustomer, updatePath, updateCustomer } = useCustomer()
  const { addEdge } = useEdge()
  const offset = new Date()
  offset.setSeconds((system?.time ?? 0) + offset.getSeconds())
  const { days, hours, minutes, seconds, isRunning, pause, start } = useStopwatch({
    autoStart: true,
    offsetTimestamp: offset,
  })

  const handlePause = () => {
    if (isRunning) pause()
    else start()
  }

  const stopGame = () => {
    setTime(calcTime(days, hours, minutes, seconds))
    setScene('start')
  }

  useEffect(() => {
    // if (seconds % 2 == 1) {
    //   setTimeout(() => {
    //     updateCustomer()
    //     updateCustomerCount()
    //   }, 2000)
    // }
    if (seconds % 30 === 5) {
      setTimeout(() => {
        showRandomAirport()
        updatePath()
      }, 1100)
    }
    if (seconds % Math.ceil(15 / (minutes + 1)) === 0) {
      setTimeout(() => {
        const c = getCustomer()
        if (c.place) {
          addCustomer(c.place, c)
          addCustomers(1)
        }
      }, 1000)
    }
    if (calcTime(days, hours, minutes, seconds) >= 3600) {
      pause()
      setScene('result')
    }
  }, [
    seconds,
    showRandomAirport,
    addCustomer,
    getCustomer,
    addCustomers,
    days,
    hours,
    minutes,
    pause,
    setScene,
    updateCustomer,
    updatePath,
    updateCustomerCount,
  ])

  return (
    <>
      <Map />
      {!isRunning && (
        <div className='absolute z-[1100] flex h-screen w-screen items-center justify-center bg-black/[0.5]'>
          <div className='flex justify-center gap-12 rounded-[5px] border-2 border-black/[0.2] bg-black p-12'>
            <div onClick={stopGame}>
              <NeonBox className='cursor-pointer p-2 text-red-500'>ゲームをやめる</NeonBox>
            </div>
            <div onClick={handlePause}>
              <NeonBox className='cursor-pointer p-2 text-green-500'>ゲームにもどる</NeonBox>
            </div>
          </div>
        </div>
      )}
      <div className='leaflet-top leaflet-left'>
        <div className='leaflet-control leaflet-control-layers left-16 grid h-24 w-56 place-items-center text-lg text-black'>
          <div>所持金：{system?.money ?? 0}万円</div>
          <div>待ち人数：{system?.customers ?? 0}人</div>
          <div>
            {Math.floor(calcTime(days, hours, minutes, seconds) / 360)}年
            {Math.floor(calcTime(days, hours, minutes, seconds) / 30) % 12}ヶ月
          </div>
        </div>
      </div>
      <div className='leaflet-top leaflet-right'>
        <button
          className='leaflet-control leaflet-control-layers text-black/[0.7]'
          onClick={handlePause}
        >
          <SettingIcon className='cursor-pointer' />
        </button>
        <div className='leaflet-control leaflet-control-layers'>
          {airport && system?.first && (
            <>
              <div className='grid h-32 w-64 p-2 text-black'>
                <div className='text-center text-xl'>{airport[system.first].name}</div>
                <div>待っている客数：{airport[system.first].customers.length}</div>
              </div>
              {system?.second && (
                <>
                  <div className='my-4 grid justify-center text-black'>
                    <ArrowIcon />
                  </div>
                  <div className='grid h-32 w-64 p-2 text-black'>
                    <div className='text-center text-xl'>{airport[system.second].name}</div>
                    <div>待っている客数：{airport[system.second].customers.length}</div>
                  </div>
                  <div className='my-4 grid justify-center'>
                    <div
                      className='w-fit cursor-pointer rounded border-2 border-black p-2 text-black'
                      onClick={() => addEdge(system.first as string, system.second as string)}
                    >
                      航路を引く
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className='absolute top-12 left-1/2 z-[500] text-black'>{minutes}</div>
      <div className='top-13 absolute left-1/2 z-[500] text-black'>
        {calcTime(days, hours, minutes, seconds)}
      </div>
    </>
  )
}

export default PlayScene
