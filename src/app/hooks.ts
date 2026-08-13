import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Reads state out of the store and returns value of that state rerendering that component
export const useAppDispatch: () => AppDispatch = useDispatch
// Triggers an action to the store which triggers a state change
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
