import axios from 'axios'
import Cookie from 'js-cookie'
import queryString from 'query-string'
import Url from './Url'
import swal from 'sweetalert'

const Reactotron = process.env.NODE_ENV !== 'production' && require('reactotron-react-js').default

function createAxios() {
  var axiosInstant = axios.create()
  axiosInstant.defaults.baseURL = 'http://35.197.150.231:8888/'
  // axiosInstant.defaults.baseURL = 'http://localhost:3001/'
  axiosInstant.defaults.timeout = 20000
  axiosInstant.defaults.headers = { 'Content-Type': 'application/json' }
  axiosInstant.defaults.headers = { 'access-control-allow-origin': '*' }

  axiosInstant.interceptors.request.use(
    async (config) => {
      config.headers.token = Cookie.get('SESSION_ID')
      return config
    },
    (error) => Promise.reject(error)
  )

  axiosInstant.interceptors.response.use(
    (response) => {
      // log via ReactOtron
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        Reactotron.apisauce(response)
      } else {
        // production code
      }

      if (response.data.code === 403) {
        Cookie.remove('SESSION_ID')
        window.location.reload()
      } else if (response.data.status !== 1)
        setTimeout(() => {
          swal({
            title: response.data.msg,
            icon: 'error',
          })
          // alert(response.data.msg)
        }, 300)
      return response
    },
    (error) => {}
  )
  return axiosInstant
}

export const getAxios = createAxios()

/* Support function */
function handleResult(api) {
  return api.then((res) => {
    if (res.data.status !== 1) {
      return Promise.reject(res.data)
    }
    return Promise.resolve(res.data)
  })
}

function handleUrl(url, query) {
  return queryString.stringifyUrl({ url: url, query })
}

//login
export const Login = (payload) => {
  return handleResult(getAxios.put(handleUrl(Url.Login), payload))
}

//user + staff
export const getListUser = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getListUser, payload)))
}

export const getUserInfo = () => {
  return handleResult(getAxios.get(handleUrl(Url.getUserInfo)))
}

export const getUserDetail = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getUserDetail, payload)))
}

export const deleteUser = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.deleteUser), payload))
}

export const getListStaff = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getListStaff, payload)))
}

export const changeStatus = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.changeStatus), payload))
}

export const createStaff = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.createStaff), payload))
}

export const updateStaff = (payload) => {
  return handleResult(getAxios.put(handleUrl(Url.updateStaff), payload))
}

export const changePassword = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.changePassword), payload))
}

//company
export const getListCompany = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getListCompany, payload)))
}
export const getInfoCompany = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getInfoCompany, payload)))
}

//job
export const getListJob = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getListJob, payload)))
}

export const getJobDetail = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getJobDetail, payload)))
}

export const changeStatusJob = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.changeStatusJob), payload))
}

export const deleteJob = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.deleteJob), payload))
}

//location
export const getListProvince = () => {
  return handleResult(getAxios.get(handleUrl(Url.getListProvince)))
}

//cv
export const getCVDetail = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getCVDetail, payload)))
}

export const changeStatusCV = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.changeStatusCV), payload))
}

export const getListCV = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getListCV, payload)))
}

export const changeStatusCv = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.changeStatusCv, payload)))
}

//overview
export const overViewAdmin = () => {
  return handleResult(getAxios.get(handleUrl(Url.overViewAdmin)))
}
