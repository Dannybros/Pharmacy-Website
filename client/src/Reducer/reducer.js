const cart = JSON.parse(localStorage.getItem("Medicine-Shop-Cart"));

export const initialState=cart? cart : [];

const reducer = (state, action)=>{
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return [...state, action.item];
            
        case 'Clear_BASKET':
            localStorage.removeItem('basket');
            return [];

        case 'DELETE_FROM_BASKET':
            const index = state.findIndex(item=>item.id ===action.id);
            const newBasket=[...state];

            if(index>=0){
                newBasket.splice(index, 1);
            };
            return newBasket

        default:
            return state;
    }
}

export default reducer;