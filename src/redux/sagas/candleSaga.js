import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//gets the candle information.
function* fetchCandleSaga(action){
  try{
      const elementsResponse = yield axios.get(`/api/candle`);
      yield put({ type: 'SET_CANDLE', payload: elementsResponse.data });
  }catch(err){
      console.log('Error in FETCH CANDLE SAGA request:', err);
  };
}

//Not in use yet
function* postCandleSaga (action){
  try{ 
    yield axios.post('/api/candle', action.payload)
    yield put({type : 'FETCH_CANDLE'})
  }catch(err){
    console.log('Error in POST CANDLE SAGA request:', err);
  }
}

// deletes the candle from the database
function* deleteCandleSaga (action){
  try{    
    yield axios.delete(`/api/candle/${action.payload.id}`)
    yield put({type: 'FETCH_CANDLE'})
  }catch(err){
    console.log('Error in DELETE CANDLE SAGA request:', err);
  }
}

// updates the candle information
function* updateCandleSaga (action){
  try{    
    yield axios.put(`/api/candle/${action.payload.id}`, action.payload)
    yield put({type: 'FETCH_CANDLE'})
  }catch(err){
    console.log('Error in UPDATE CANDLE SAGA request:', err);
  }
}

function* candleSaga(action){
  yield takeEvery('FETCH_CANDLE', fetchCandleSaga);
  yield takeEvery('POST_CANDLE', postCandleSaga);
  yield takeEvery('DELETE_CANDLE', deleteCandleSaga);
  yield takeEvery('UPDATE_CANDLE', updateCandleSaga);
}

export default candleSaga;