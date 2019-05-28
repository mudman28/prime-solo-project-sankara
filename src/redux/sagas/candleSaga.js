import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchCandleSaga(action){
  try{
      const elementsResponse = yield axios.get(`/api/candle`);
      yield put({ type: 'SET_CANDLE', payload: elementsResponse.data });
  }catch(err){
      console.log('Error in FETCH CANDLE request:', err);
  };
}
function* candleSaga(action){
  yield takeEvery('FETCH_CANDLE', fetchCandleSaga);
}
export default candleSaga;