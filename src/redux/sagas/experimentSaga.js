import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchExperimentSaga(action){
  try{
      const elementsResponse = yield axios.get(`/api/candle/experiment`);
      yield put({ type: 'SET_EXPERIMENT', payload: elementsResponse.data });
  }catch(err){
      console.log('Error in FETCH EXPERIMENT request:', err);
  };
}
function* experimentSaga(action){
  yield takeEvery('FETCH_EXPERIMENT', fetchExperimentSaga);
}
export default experimentSaga;