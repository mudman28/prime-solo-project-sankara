const experimentReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_EXPERIMENT':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default experimentReducer;
  