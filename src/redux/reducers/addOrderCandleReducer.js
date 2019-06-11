let initialState =[]

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

/* <p>Date: {this.props.order.customer.date}</p>
<p>Name: {this.props.order.customer.firstName + ' '
    + this.props.order.customer.lastName}</p>
<p>Address: {this.props.order.customer.streetAddress + ', '
    + this.props.order.customer.city + ', '
    + this.props.order.customer.state + ', '
    + this.props.order.customer.zip}</p>
for( let i in {this.props.order.candle})
<p>Candle: Object.keys({this.props.order.candle})[i]</p>
<p>Quantity: {this.props.order.candle}[Object.keys({this.props.order.candle})[i]]</p> */

// user will be on the redux state at:
// state.user
export default addOrderCandleReducer;


 