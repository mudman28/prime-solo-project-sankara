import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


//Gets the pending order information from the database
function* fetchPendingSaga(action){
  try{
    const elementsResponse = yield axios.get(`/api/order`);
    yield put({ type: 'SET_PENDING', payload: elementsResponse.data });
  }catch(err){
    console.log('Error in FETCH PENDING ORDERS request:', err);
  };
}

//Posts new order information into the database
function* postOrderSaga (action){
  try{ 
    console.log(action.payload);
    
    yield axios.post('/api/order', action.payload);
    yield put({type: 'FETCH_PENDING'});
  }catch(err){
    console.log('Error in ADD PENDING ORDERS request:', err);
  }
}

//Not in use yet
function* deleteOrderSaga (action){
  try{    
    yield axios.delete(`/api/order`)
    yield put({type: 'FETCH_PENDING'})
  }catch(err){
    console.log(err);
  }
}

function* pendingSaga(action){
  yield takeEvery('FETCH_PENDING', fetchPendingSaga);
  yield takeEvery('ADD_ORDER', postOrderSaga);
  yield takeEvery('DELETE_ORDER', deleteOrderSaga);
}
export default pendingSaga;
