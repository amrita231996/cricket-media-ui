import { getStorageItem, setStorageItem } from './sessionStorage'

export const getAuthToken = () => getStorageItem('token')
export const getAuthStatus = () => !!getAuthToken()