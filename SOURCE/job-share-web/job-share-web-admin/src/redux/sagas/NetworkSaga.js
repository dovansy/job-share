import { put, takeEvery, call } from 'redux-saga/effects'
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_LIST_COMPANY,
  GET_LIST_COMPANY_SUCCESS,
  GET_LIST_COMPANY_FAIL,
} from '../actions/type'

import * as API from '../../constants/Api'

export function* getUserInfor(payload) {
  try {
    const response = yield call()
    yield put({ type: GET_USER_SUCCESS, payload: response })
  } catch (err) {
    yield put({ type: GET_USER_FAIL, payload: err })
  }
}

export function* getListCompany(action) {
  try {
    const response = yield call(API.getListCompany, action.payload)
    yield put({ type: GET_LIST_COMPANY_SUCCESS, payload: response })
  } catch (err) {
    yield put({ type: GET_LIST_COMPANY_FAIL, payload: err })
  }
}

export const watchGetUser = takeEvery(GET_USER, getUserInfor)
export const watchGetListCompany = takeEvery(GET_LIST_COMPANY, getListCompany)
