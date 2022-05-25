import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchScene } from '../slices/sceneSlice';

const useScene = () => {
  const scene = useSelector((state) => state.scene.scene);
  const dispatch = useDispatch();
  const handler = useCallback(
    (name) => dispatch(switchScene(name)),
    [dispatch]
  );

  return { scene, handler }
}

export default useScene;
