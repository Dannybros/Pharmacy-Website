import io from 'socket.io-client';

const User = JSON.parse(localStorage.getItem("Medicine-Admin-User"));

export const initialState={
    user:User? User : null,
    socket: io.connect("http://localhost:5000")
};

const reducer = (state, action)=>{
    switch (action.type) {
        case 'ADD_USER':
            return{
                ...state,
                user: action.token,
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