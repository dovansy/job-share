import { GET_LIST_COMPANY, GET_USER } from './type'

export const getUserInfoAction = () => ({
  type: GET_USER,
  payload: {},
})

export const getListCompany = (payload) => ({
  type: GET_LIST_COMPANY,
  payload: payload,
})
