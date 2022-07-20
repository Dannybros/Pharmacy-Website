import React, {useEffect, createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();

export const StateProvider =({reducer, initialState, children})=>{

    const redux = useReducer(reducer, initialState);
    
    useEffect(() => {
        localStorage.setItem('Medicine-Admin-User', JSON.stringify(redux[0].user))
    }, [redux])

    return (
        <StateContext.Provider value={redux} props={initialState}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);