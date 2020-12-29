import { GET_USER, REQUEST_LOGIN } from './type'

export const getUserInfo = () => ({
  type: GET_USER,
  payload: {},
})

export const loginRecruitment = (payload) => ({
  type: REQUEST_LOGIN,
  payload: payload,
})
