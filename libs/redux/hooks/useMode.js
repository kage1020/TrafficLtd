import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMode } from '../slices/modeSlice';

const useMode = () => {
  const mode = useSelector((state) => state.mode.mode);
  const dispatch = useDispatch();
  const handler = useCallback(
    (name) => dispatch(selectMode(name)),
    [dispatch]
  );

  return { mode, handler };
};

export default useMode;
