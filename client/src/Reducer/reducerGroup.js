const localCart = JSON.parse(localStorage.getItem("Medicine-Shop-Cart"));
const localCurrency = JSON.parse(localStorage.getItem("Medicine-Shop-Currency"));

export const initialState={
    cart: localCart? localCart: [],
    currency:localCurrency? {label:localCurrency.label, abbr:localCurrency.abbr} : {label:"LAOKIP", abbr:"KIP"}
};

const reducer = (state, action)=>{
    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(item => item.id === action.id);
    const updatedItem = {
        ...updatedCart[updatedItemIndex]
    };
    switch (action.type) {
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
            const index = state.cart.findIndex(item=>item.id ===action.id);
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