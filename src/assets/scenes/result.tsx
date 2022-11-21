import useScene from '@libs/hooks/useScene'

const ResultScene = () => {
  const { data: scene, setScene } = useScene()
  return (
    <>
      <div>{scene} page</div>
      <button onClick={() => setScene('start')}>go to start</button>
    </>
  )
}

export default ResultScene
