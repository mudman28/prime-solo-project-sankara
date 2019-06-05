const candleReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CANDLE':
        return action.payload;
        case 'GET_CANDLE':
        return action.payload;
        case 'CLEAR_CANDLE':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default candleReducer;