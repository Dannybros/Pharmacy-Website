import io from 'socket.io-client';

const User = JSON.parse(localStorage.getItem("Medicine-Admin-User"));
const MainMenu = JSON.parse(localStorage.getItem("Medicine-Admin-MainMenu"));
const SubMenu = JSON.parse(localStorage.getItem("Medicine-Admin-SubMenu"));

export const initialState={
    user:User? User : null,
    socket: io.connect("http://localhost:5000"),
    mainMenu:MainMenu? MainMenu: 0,
    subMenu:SubMenu?SubMenu: null,
};

const reducer = (state, action)=>{
    switch (action.type) {
        case 'ADD_USER':
            return{
                ...state,
                user: action.token,
            };

        case 'SET_MENU':
            return{
                ...state,
                mainMenu: action.mainMenu,
            };

        case 'SET_SUBMENU':
            return{
                ...state,
                subMenu: action.subMenu,
            };

        case 'LOG_OUT':
            return{
                ...state,
                user: null,
            };
        default:
            return state;
    }
}

export default reducer;