import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//Not in use yet
function* fetchExperimentSaga(action){
  try{
      const elementsResponse = yield axios.get(`/api/candle/experiment`);
      yield put({ type: 'SET_EXPERIMENT', payload: elementsResponse.data });
  }catch(err){
      console.log('Error in FETCH EXPERIMENT request:', err);
  };
}

//Not in use yet
function* deleteExperimentSaga (action){
    try{    
      yield axios.delete(`/api/experiment`)
      yield put({type: 'FETCH_EXPERIMENT'})
    }catch(err){
      console.log('Error in DELETE EXPERIMENT SAGA request:', err);
    }
}

function* experimentSaga(action){
  yield takeEvery('FETCH_EXPERIMENT', fetchExperimentSaga);
  yield takeEvery('DELETE_EXPERIMENT', deleteExperimentSaga);
}
export default experimentSaga;