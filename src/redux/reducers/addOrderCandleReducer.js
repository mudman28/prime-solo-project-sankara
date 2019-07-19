let initialState =[]

//stores the candle info from new orders
const addOrderCandleReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEND_CAND':
            return  action.payload 
        case 'CANCEL_ORDER':
            return []
        default:
            return state;
    }
};



export default addOrderCandleReducer;


 