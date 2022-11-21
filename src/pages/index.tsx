import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

import PlayScene from '@assets/scenes/play'
import ResultScene from '@assets/scenes/result'
import StartScene from '@assets/scenes/start'
import useScene from '@libs/hooks/useScene'

const Home: NextPage = () => {
  const { data: scene } = useScene()

  useEffect(() => {
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      if (scene === 'play') e.returnValue = ''
    })
  }, [scene])

  return (
    <>
      <Head>
        <title>Traffic Ltd.</title>
        <meta
          name='description'
          content='日本の公共交通機関を舞台にした経営ストラテジーシミュレーションゲーム'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='h-screen w-screen select-none bg-black font-gothic text-white'>
        {scene === 'start' && <StartScene />}
        {scene === 'play' && <PlayScene />}
        {scene === 'result' && <ResultScene />}
      </main>
      <div className='absolute right-3 bottom-3 text-white'>ver 0.1.0</div>
    </>
  )
}

export default Home
