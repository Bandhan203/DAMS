import { useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Custom hook to use Redux with proper typing
export const useRedux = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  
  return { dispatch, selector };
};
