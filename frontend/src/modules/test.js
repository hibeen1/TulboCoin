import { fetchAllUsersApi } from '../store/api'
import { call, takeLatest } from 'redux-saga/effects';

const TEST_ASYNC = 'TEST_ASYNC'

export const testAsync = () => ({ type: TEST_ASYNC })

const initialState = {
  isLoading: true
}

function* testSaga() {
  try{
    const response = yield call(fetchAllUsersApi)
    if (response.status === 200) {
      console.log(response.data)
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}

export function* testSagaModule() {
  yield takeLatest(TEST_ASYNC, testSaga)
}