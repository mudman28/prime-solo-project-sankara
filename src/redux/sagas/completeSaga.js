import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchCompletedSaga(action){
  try{
      const elementsResponse = yield axios.get(`/api/order/complete`);
      yield put({ type: 'SET_COMPLETE', payload: elementsResponse.data });
  }catch(err){
      console.log('Error in FETCH PENDING ORDERS request:', err);
  };
}
function* completedSaga(action){
  yield takeEvery('FETCH_COMPLETE', fetchCompletedSaga);
}
export default completedSaga;