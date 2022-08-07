import React, {useEffect, createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();

export const StateProvider =({reducer, initialState, children})=>{

    const redux = useReducer(reducer, initialState);
    
    useEffect(() => {
        localStorage.setItem('Medicine-Admin-User', JSON.stringify(redux[0].user))
        localStorage.setItem('Medicine-Admin-MainMenu', JSON.stringify(redux[0].mainMenu))
        localStorage.setItem('Medicine-Admin-SubMenu', JSON.stringify(redux[0].subMenu))
    }, [redux])

    return (
        <StateContext.Provider value={redux} props={initialState}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);