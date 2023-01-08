import axios from 'axios'
import globalConstants from '../constants/globalConstants'
import sagaActions from '../redux/actions'
import { getAuthStatus } from './global'

import * as sessionStorageFuncs from './sessionStorage'

const api = (() => {
  let axiosInstance = null

  const createAxiosInstance = ({
    baseUrl = '/', visibilityScopeKey, appApiKey, timeout = globalConstants.idleTimeOut,
  }, dispatch) => {
    let timmer = 0
    let lastRequestUrl = ''

    axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        ...globalConstants.api.constants.headers,
        'x-visibility-scope-key': visibilityScopeKey,
        'x-api-as-key': appApiKey,
      },
      timeout: globalConstants.api.constants.timeOut,
    })

    /* istanbul ignore next */
    const stopTimer = () => {
      window.clearTimeout(timmer)
    }

    /* istanbul ignore next */
    const forceLogoutCallBack = () => {
      stopTimer()
      dispatch({
        type: sagaActions.POST_LOGOUT,
      })
    }

    /* istanbul ignore next */
    const startTimer = () => {
      timmer = window.setTimeout(() => {
        forceLogoutCallBack()
      }, timeout)
    }

    /* istanbul ignore next */
    const restartTimer = () => {
      stopTimer()
      startTimer()
    }

    /* istanbul ignore next */
    const activateForceLogout = () => {
      const authStatus = !!getAuthStatus()
      if (lastRequestUrl.indexOf('logout') <= -1 && authStatus) { restartTimer() } else { stopTimer() }
    }

    /* istanbul ignore next */
    window.addEventListener('wheel', () => {
      activateForceLogout()
    })

    /* istanbul ignore next */
    window.addEventListener('mousemove', () => {
      activateForceLogout()
    })

    /* istanbul ignore next */
    window.addEventListener('keypress', () => {
      activateForceLogout()
    })

    /* istanbul ignore next */
    window.addEventListener('click', () => {
      activateForceLogout()
    })

    /* istanbul ignore next */
    const initLogout = () => {
      const authStatus = !!getAuthStatus()
      if (lastRequestUrl.indexOf('logout') >= 0 && authStatus) {
        sessionStorageFuncs.clearStorage()
        window.location.reload()
      }
    }

    /* istanbul ignore next */
    axiosInstance.interceptors.request.use((config) => {
      lastRequestUrl = config.url
      activateForceLogout()
      const requestConfig = config
      const user = sessionStorageFuncs.getStorageItem('user')
      const accessToken = sessionStorageFuncs.getStorageItem('access-token')
      const guid = sessionStorageFuncs.getStorageItem('guid')

      /* istanbul ignore next */
      if (user && accessToken && guid) {
        const { memberID } = JSON.parse(user)
        requestConfig.headers.Authorization = `Bearer ${accessToken}`
        requestConfig.headers.Identifier_1 = memberID
        requestConfig.headers.Identifier_2 = guid
      }
      return requestConfig
    })

    /* istanbul ignore next */
    axiosInstance.interceptors.response.use((response) => {
      activateForceLogout()
      initLogout()
      return response
    }, (error) => {
      activateForceLogout()
      initLogout()
      return Promise.reject(error)
    })
  }

  return {
    createAxiosInstance,
    axiosInstance: () => axiosInstance,
  }
})()

export default api
