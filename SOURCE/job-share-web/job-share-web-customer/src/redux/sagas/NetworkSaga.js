import { put, takeEvery, call } from 'redux-saga/effects'
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAIL,
} from '../actions/type'
import Cookie from 'js-cookie'

import * as API from '../../constants/Api'

export function* loginRecruitment({ payload }) {
  try {
    const response = yield call(API.Login, payload)
    // Cookie.set('SESSION_ID_RECRUITMENT', response.data.token, {
    //   expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month
    // })
    yield put({ type: REQUEST_LOGIN_SUCCESS, payload: response })
  } catch (err) {
    yield put({ type: REQUEST_LOGIN_FAIL, payload: err })
  }
}
export const watchLoginRecruitment = takeEvery(REQUEST_LOGIN, loginRecruitment)
