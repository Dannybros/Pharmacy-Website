const cart = JSON.parse(localStorage.getItem("Medicine-Shop-Cart"));

export const initialState=cart? cart : [];

const reducer = (state, action)=>{
    const updatedCart = [...state];
    const updatedItemIndex = updatedCart.findIndex(item => item.id === action.id);
    const updatedItem = {
        ...updatedCart[updatedItemIndex]
    };

    switch (action.type) {
        case 'ADD_TO_BASKET':
            updatedCart.push({ ...action.item, quantity: 1 });
            return updatedCart;
            
        case 'Clear_BASKET':
            return [];
        
        case 'QUANTITY_INCREMENT':
            updatedItem.quantity++;
            updatedCart[updatedItemIndex] = updatedItem;
            return updatedCart;

        case 'QUANTITY_DECREMENT':
            updatedItem.quantity--;
            updatedCart[updatedItemIndex] = updatedItem;
            return updatedCart;

        case 'DELETE_FROM_BASKET':
            const index = state.findIndex(item=>item.id ===action.id);

            if(index>=0){
                updatedCart.splice(index, 1);
            };
            return updatedCart

        default:
            return state;
    }
}

export default reducer;