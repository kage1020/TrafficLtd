import useScene from '../libs/redux/hooks/useScene';

const StartScene = () => {
  const { scene, handler: setScene } = useScene();

  return (
    <>
    
      <div>
        <p>{scene} page</p>
        <button onClick={() => setScene('play')}>play</button>
      </div>
    </>
  )
}

export default StartScene
