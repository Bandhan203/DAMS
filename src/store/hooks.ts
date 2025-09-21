import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook to use Redux with proper typing
export const useRedux = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  
  return { dispatch, selector };
};
