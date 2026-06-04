import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '@/store';

/** Hook de selector tipado. */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
