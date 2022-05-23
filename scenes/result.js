import useScene from '../libs/redux/hooks/useScene'

const ResultScene = () => {
  const { scene, handler: setScene } = useScene();
  return (
    <>
      <div>{scene} page</div>
      <button onClick={() => setScene('start')}>go to start</button>
    </>
  )
}

export default ResultScene
