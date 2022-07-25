import React, {useEffect, createContext, useContext, useReducer} from 'react';
import { useLocalStorage } from './useLocalStorage';

export const StateContext = createContext();

export const StateProvider =({reducer, initialState, children})=>{

    const redux = useReducer(reducer, initialState);
    
    const [cart, setCart] = useLocalStorage("Cart");
    const [user, setUser] = useLocalStorage("User");
    
    useEffect(() => {
        setCart(redux[0].cart);
        setUser(redux[0].user);
        localStorage.setItem('Medicine-Shop-Lang', redux[0].lang);
    }, [setCart,setUser, redux])

    return (
        //<StateContext.Provider value={redux} props={cart}>   props={{cart, currency, user}}
        <StateContext.Provider value={redux} props={initialState} obj={{cart, user}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);