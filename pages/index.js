import Head from 'next/head'

const Home = () => {
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

      <main className='flex justify-center items-center'>
        <h1>Hello Next.js</h1>
      </main>
    </>
  );
}

export default Home;
