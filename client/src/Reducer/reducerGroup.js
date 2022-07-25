import io from 'socket.io-client';

const localCart = JSON.parse(localStorage.getItem("Medicine-Shop-Cart"));
const localUser = JSON.parse(localStorage.getItem("Medicine-Shop-User"));
const localLang = localStorage.getItem("Medicine-Shop-Lang")

export const initialState={
    cart: localCart? localCart: [],
    user:localUser? localUser : {},
    socket: io.connect("http://localhost:5000"),
    lang:localLang? localLang : 'en'
};

const reducer = (state, action)=>{
    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(item => item.id === action.id);
    const updatedItem = {
        ...updatedCart[updatedItemIndex]
    };
    switch (action.type) {
        case 'ADD_USER':
            return{
                ...state,
                user: action.user,
            };

        case 'LOG_OUT':
            return{
                ...state,
                user: {},
            };
        
        case 'SWITCH_LANG':
            return{
                ...state,
                lang: action.lang,
            };

        case 'ADD_TO_BASKET':
            updatedCart.push({ ...action.item, quantity: 1 });
            return{
                ...state,
                cart: updatedCart,
            };
        
        case 'Clear_BASKET':
            localStorage.removeItem('basket');
            return{
                ...state,
                cart: [],
            };
        
        case 'QUANTITY_INCREMENT':
            updatedItem.quantity++;
            updatedCart[updatedItemIndex] = updatedItem;
            return{
                ...state,
                cart: updatedCart,
            };

        case 'QUANTITY_DECREMENT':
            updatedItem.quantity--;
            updatedCart[updatedItemIndex] = updatedItem;
            return{
                ...state,
                cart: updatedCart,
            };

        case 'DELETE_FROM_BASKET':
            const index = state.cart.findIndex(item=>item._id ===action.id);
            if(index>=0){
                updatedCart.splice(index, 1);
            };
            return{
                ...state, 
                cart: updatedCart,
            };

        case 'CHANGE_CURRENCY':
            return{
                ...state,
                currency: {
                    label:action.label,
                    abbr:action.abbr
                },
            };
        
        default:
            return state;
    }
}

export default reducer;