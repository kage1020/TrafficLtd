import Head from 'next/head'
import { useSelector } from 'react-redux';
import PlayScene from '../scenes/play';
import ResultScene from '../scenes/result';
import StartScene from '../scenes/start';

const Home = () => {
  const scene = useSelector(state => state.scene.scene);
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

      <main className='w-screen h-screen bg-black text-white font-gothic'>
        {scene === 'start' && <StartScene />}
        {scene === 'play' && <PlayScene />}
        {scene === 'result' && <ResultScene />}
      </main>
    </>
  );
}

export default Home;
