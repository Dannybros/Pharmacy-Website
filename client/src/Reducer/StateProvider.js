import React, {useEffect, createContext, useContext, useReducer} from 'react';
import { useLocalStorage } from './useLocalStorage';

export const StateContext = createContext();

export const StateProvider =({reducer, initialState, children})=>{

    const redux = useReducer(reducer, initialState);
    
    const [cart, setCart] = useLocalStorage("Cart");
    const [currency, setCurrency] = useLocalStorage("Currency");
    
    useEffect(() => {
        setCart(redux[0].cart);
        setCurrency(redux[0].currency);
    }, [setCart,setCurrency, redux])

    return (
        //<StateContext.Provider value={redux} props={cart}>
        <StateContext.Provider value={redux} props={{cart, currency}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);