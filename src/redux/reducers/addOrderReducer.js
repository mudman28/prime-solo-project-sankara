let initialState ={}

//stores the customer info from new orders
const addOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEND_CUST':
            return  action.payload
        case 'CANCEL_ORDER':
            return {}
        default:
            return state;
    }
};

export default addOrderReducer;