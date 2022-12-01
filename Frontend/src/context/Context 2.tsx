import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const localUser: any = localStorage.getItem("user") ? localStorage.getItem("user") : "unavailable";
interface GlobalInfo {
    user: any,
    isFetching: boolean,
    error: boolean,
    dispatch?: any
}

const INITIAL_STATE: GlobalInfo = {
    user: localUser === "unavailable" ? null : JSON.parse(localUser),
    isFetching: false,
    error: false,
}
export const Context = createContext(INITIAL_STATE);
export const ContextProvider = ({ children }: any) => {
    const [state, dispatch]: any = useReducer<any>(Reducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);
    return (
        <Context.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}>
            {children}
        </Context.Provider>
    )
};