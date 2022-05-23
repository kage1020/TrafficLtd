import useScene from '../libs/redux/hooks/useScene'

const PlayScene = () => {
  const { scene, handler: setScene } = useScene();

  return (
    <>
      <div>{scene} page</div>
      <button className='mr-4' onClick={() => setScene('start')}>back to start</button>
      <button onClick={() => setScene('result')}>go to result</button>
    </>
  )
}

export default PlayScene
