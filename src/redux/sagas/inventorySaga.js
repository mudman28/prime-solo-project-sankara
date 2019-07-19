import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* updateInventorySaga(action){
    try{    
      yield axios.put(`/api/order/${action.payload.id}`, action.payload)
      yield put({type: 'FETCH_CANDLE'})
    }catch(err){
      console.log('Error in UPDATE COMPLETE SAGA request:', err);
    }
  }

  function* inventorySaga(action){
    yield takeEvery('UPDATE_INVENTORY', updateInventorySaga);
  }

  export default inventorySaga;