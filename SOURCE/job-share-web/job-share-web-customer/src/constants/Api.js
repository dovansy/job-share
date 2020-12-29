import axios from 'axios'
import Cookie from 'js-cookie'
import queryString from 'query-string'
import Url from './Url'
import swal from 'sweetalert'

const Reactotron = process.env.NODE_ENV !== 'production' && require('reactotron-react-js').default

function createAxios() {
  var axiosInstant = axios.create()
  // axiosInstant.defaults.baseURL = 'http://localhost:3001/'
  axiosInstant.defaults.baseURL = 'http://35.197.150.231:8888/'
  axiosInstant.defaults.timeout = 20000
  axiosInstant.defaults.headers = { 'Content-Type': 'application/json' }
  axiosInstant.defaults.headers = { 'access-control-allow-origin': '*' }

  axiosInstant.interceptors.request.use(
    async (config) => {
      if (window.location.pathname.indexOf('/nha-tuyen-dung') !== -1) {
        config.headers.token = Cookie.get('SESSION_ID_RECRUITMENT')
      } else {
        config.headers.token = Cookie.get('SESSION_ID_APPLICANT')
      }
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
        if (window.location.pathname.indexOf('/nha-tuyen-dung') !== -1) {
          Cookie.remove('SESSION_ID_RECRUITMENT')
        } else {
          Cookie.remove('SESSION_ID_APPLICANT')
        }
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

export const Login = (payload) => {
  return handleResult(getAxios.put(handleUrl(Url.Login), payload))
}

//user + staff

export const getUserInfo = () => {
  return handleResult(getAxios.get(handleUrl(Url.getUserInfo)))
}

export const getUserDetail = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getUserDetail, payload)))
}

export const createUser = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.createStaff), payload))
}

export const updateStaff = (payload) => {
  return handleResult(getAxios.put(handleUrl(Url.updateStaff), payload))
}

export const changePassword = (payload) => {
  return handleResult(getAxios.put(handleUrl(Url.changePassword), payload))
}

//company
export const getListCompany = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getListCompany, payload)))
}
export const getInfoCompany = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getInfoCompany, payload)))
}

export const updateCompany = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.updateCompany), payload))
}

//location
export const getListProvince = () => {
  return handleResult(getAxios.get(handleUrl(Url.getListProvince)))
}
export const getListDistrict = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getListDistrict, payload)))
}

//job
export const createJob = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.createJob), payload))
}

export const getListJob = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getListJob, payload)))
}
export const getJobDetail = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getJobDetail, payload)))
}

export const getListJobStatus = () => {
  return handleResult(getAxios.get(handleUrl(Url.getListJobStatus)))
}

export const getListJobByUser = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getListJobByUser, payload)))
}

export const getListJobHome = () => {
  return handleResult(getAxios.get(handleUrl(Url.getListJobHome)))
}

export const deleteJob = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.deleteJob), payload))
}

//position
export const getListPosition = () => {
  return handleResult(getAxios.get(handleUrl(Url.getListPosition)))
}

// review rating
export const createReview = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.createReview), payload))
}

// cv
export const createCV = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.createCV), payload))
}

export const updateCV = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.updateCV), payload))
}

export const getCVDetail = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getCVDetail, payload)))
}

export const getListCV = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getListCV, payload)))
}

//overview
export const overViewRecruitment = () => {
  return handleResult(getAxios.get(handleUrl(Url.overViewRecruitment)))
}

//sendEmail
export const sendEmail = (payload) => {
  return handleResult(getAxios.post(handleUrl(Url.sendEmail), payload))
}
export const getListApply = (payload) => {
  return handleResult(getAxios.get(handleUrl(Url.getListApply), payload))
}
