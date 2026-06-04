import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';

/** Hook de dispatch tipado. */
export const useAppDispatch = () => useDispatch<AppDispatch>();
