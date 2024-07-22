import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import rootReducer, {RootState} from "./reducers/index";


export const store = configureStore({
    reducer: rootReducer,
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectComments = (state: RootReducer) => state.comments;
export const selectDesigners = (state: RootReducer) => state.designers;
export const selectTasks = (state: RootReducer) => state.tasks;