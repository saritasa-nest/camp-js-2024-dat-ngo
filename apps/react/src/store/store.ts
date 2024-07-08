import { configureStore } from '@reduxjs/toolkit';
import {
	TypedUseSelectorHook, useDispatch, useSelector,
} from 'react-redux';

import { genresSlice } from './genre/slice';

/** JSDoc . */
export const store = configureStore({
	reducer: {
		genres: genresSlice.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware({
		// We need to disable this check to allow ES6 classes in Redux.
		// You can find more info about this middleware in docs:
		// https://redux-toolkit.js.org/api/serializabilityMiddleware
		serializableCheck: false,
	}),
});

/** JSDoc . */
export type RootState = ReturnType<typeof store.getState>;

/** JSDoc . */
export type AppDispatch = typeof store.dispatch;

/** Typed `useDispatch` hook. */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

/** JSDoc . */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
