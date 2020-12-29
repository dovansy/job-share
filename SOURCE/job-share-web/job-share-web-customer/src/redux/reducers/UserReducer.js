import { reactotronRedux } from 'reactotron-redux'
import { REQUEST_LOGIN, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_FAIL } from '../actions/type'
import reactotron from 'reactotron-react-js'
const initialState = {
  data: {},
  isLoading: false,
  error: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN: {
      return { ...state, isLoading: true }
    }
    case REQUEST_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload.data,
      }
    }
    case REQUEST_LOGIN_FAIL: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    }
    default:
      return state
  }
}
