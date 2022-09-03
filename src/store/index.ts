import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { Action, AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { authReducer } from "./reducers/auth/authReducer";
import { eventReducer } from './reducers/event/eventReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  event:eventReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionTypesFromStore<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>;
export type BaseThunkType<A extends Action, R = void> = ThunkAction<
  R,
  RootState,
  unknown,
  A
>;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
