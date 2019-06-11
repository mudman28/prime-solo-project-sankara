import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchCompletedSaga(action){
  try{
      const elementsResponse = yield axios.get(`/api/order/complete`);
      yield put({ type: 'SET_COMPLETE', payload: elementsResponse.data });
  }catch(err){
      console.log('Error in FETCH COMPLETE ORDERS request:', err);
  };
}


function* updateCompletedSaga(action){
  try{    
    yield axios.put(`/api/order/${action.payload.order_id}`, action.payload)
    yield put({type: 'FETCH_COMPLETE'})
    yield put({type: 'FETCH_PENDING'})
  }catch(err){
    console.log('Error in UPDATE COMPLETE SAGA request:', err);
  }
}

function* completedSaga(action){
  yield takeEvery('FETCH_COMPLETE', fetchCompletedSaga);
  yield takeEvery('UPDATE_COMPLETE', updateCompletedSaga);
}
export default completedSaga;