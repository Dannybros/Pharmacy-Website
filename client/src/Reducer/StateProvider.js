import React, {useEffect, createContext, useContext, useReducer} from 'react';
import { useLocalStorage } from './useLocalStorage';

export const StateContext = createContext();

export const StateProvider =({reducer, initialState, children})=>{

    const redux = useReducer(reducer, initialState);
    
    const [cart, setCart] = useLocalStorage("Cart");
    
    useEffect(() => {
        setCart(redux[0]);
    }, [setCart, redux])

    return (
        <StateContext.Provider value={redux} props={cart}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);