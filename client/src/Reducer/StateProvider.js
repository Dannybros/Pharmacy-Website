import React, {useEffect, createContext, useContext, useReducer} from 'react';
import { useLocalStorage } from './useLocalStorage';

export const StateContext = createContext();

export const StateProvider =({reducer, initialState, children})=>{

    const redux = useReducer(reducer, initialState);
    
    const [cart, setCart] = useLocalStorage("Cart");
    const [currency, setCurrency] = useLocalStorage("Currency");
    const [user, setUser] = useLocalStorage("User");
    
    useEffect(() => {
        setCart(redux[0].cart);
        setCurrency(redux[0].currency);
        setUser(redux[0].user);
        localStorage.setItem('Medicine-Shop-Lang', redux[0].lang);
    }, [setCart,setCurrency,setUser, redux])

    return (
        //<StateContext.Provider value={redux} props={cart}>   props={{cart, currency, user}}
        <StateContext.Provider value={redux} props={initialState} obj={{cart, currency, user}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);