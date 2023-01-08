import JSEncrypt from 'jsencrypt'
import moment from 'moment'

// 2048
const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAykyjf9hVu6+bWfRaaOVRLHy0UACXnVhzcwO1xCfQB9XQBt2Awq81cwZmE148U/4d32P63k8USXDrCe5+L+U5Hk/ZnflPLtuaXSGzz3avkAYDb9qlrg8f+sWKHkZ285p9AoL8sk/49gV4gaZOhhK0N9MTxXoZpFse6umD6G1dRotaBoztVsqKSg7P6Wwu7ULfAtDBMFCtMweLe5bnyP49Ctl3FOP+Gfw23PsnohOxTCJyw1p0kHR5OXDlVdwAILVhGaeTV5fIO8Kq1EQ+c0uJrmWHnYQVIwJmwH5+nvPPXwvRxpsC/eM+QsvYcydClWR5Rj/7mZGKql60vqxFM22+vwIDAQAB'
const privateKey = 'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDKTKN/2FW7r5tZ9Fpo5VEsfLRQAJedWHNzA7XEJ9AH1dAG3YDCrzVzBmYTXjxT/h3fY/reTxRJcOsJ7n4v5TkeT9md+U8u25pdIbPPdq+QBgNv2qWuDx/6xYoeRnbzmn0CgvyyT/j2BXiBpk6GErQ30xPFehmkWx7q6YPobV1Gi1oGjO1WyopKDs/pbC7tQt8C0MEwUK0zB4t7lufI/j0K2XcU4/4Z/Dbc+yeiE7FMInLDWnSQdHk5cOVV3AAgtWEZp5NXl8g7wqrURD5zS4muZYedhBUjAmbAfn6e889fC9HGmwL94z5Cy9hzJ0KVZHlGP/uZkYqqXrS+rEUzbb6/AgMBAAECggEALGmu635fNBlVjeYrgyP1MkMegwHeR1kH35RM74eeEFpMlXVDs3orzdj1yALEU9xSSpz0kqHh3k3ADCoj4ff9Fj6JlDkLvUnRFek0RLPVz1TCpGfoP9JqPu/nZsYpj0m3cDm5qJwOGFUTI8OTMbQhhK/+gzhPMNoga4pgv0JjW/0QEARyvmcKL0fjL4IdDgJa5+gy5KVrwLAaVqb14PkLojWYbgF41CwTKTJZRSweQnyw4IhSKceIdTX+q7ixryLbiVLvOJg8qnz+ygkf4kQRkJ7sE0UCd903DMW4UK0OMJqV6MmRskiqmuRR6n1D/6Nv0lwe9F55Y2l37kMFoOARYQKBgQDopOTd+iR5HHwuo55yunFbn78RaDzsK3g0nFzgiM1QbpLQkhCnXjfZ8FCakenbWGT07J+g9v/U1Ppy/UyoO21GqXmMZjrYbdRKnIw7wcxHgtFH4S3klwuNxdq0G9sTwQUogXKniks6JaXyTEC7vGZkV1Vxsn9gm13Rhl2qfO64+wKBgQDem91jgXu10zh7/XitLesMEKtvpFgSDhwz8w9jRnkmxRseTEZxLfq/we/l9qjikveT83YZYVfZeOqHGN+rc+XE9ZSS8YPYMtI9pWTZbOPBDgjiiNx1EXxPuiVNR9vCj/3czwYmt4T/bKoeikTavdDBfVRGSDFysKbeYpnVW+/uDQKBgQC/a431J3EDRfDX30DsXYQQQ6zPAdm+6TWK9G1nQqjM2W5rtwOE8v05kYaA6DZniJ/o9xmRNCrkUCmSm+CLO/p5/dBJOYSJuDTI/25TbO5MmNLiNeGxCKc1C+sb7x+fbV51Ka3RNPUY7wlQCHXrAuWtAj8HwjsUnkHfuJMxSIKUKQKBgQDKMrk9EPfViC3eMbXTV8oQA3Q0zApTHA3yAe0QN4sD9DVVp+K0GxeP5hCJySpN40COWq4DD7BEENi2LZm8mmEyLf7uGgGv9zmQVRLti0K0sJLRcY8NpvxLTsFjGMo8R55HWqQztq5Pc9xyMRWpupBLsBNEY37Gtj5b8SPZ8NBWYQKBgQDH/Vs/2/Z6dFSblkUBiYbt3uL8FViCNjTyhYCVjfTt75mWiEYOfDcZ2yOx36MDItENi9VYAQGzYohhiQyJJDPfoS5/6aSz7/ZYrYgohiV7+uO2c8hdC8f2GojyOZibxIQ9GyRejuiDh/A98EE4GDw2M3duU+PggUBzzGDJHn9mjQ=='

export const encryptData = (message, pubKey = publicKey) => {
  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(pubKey)
  return jsEncrypt.encrypt(message)
}

export const decryptData = (message, privKey = privateKey) => {
  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPrivateKey(privKey)
  return jsEncrypt.decrypt(message)
}

export const isNullOrUndefined = (message) => (typeof message === 'object'
  ? Object.keys(message).length === 0 : message?.length === 0 || typeof message === 'undefined')

export const isNotEmpty = (value) => {
  if (!value) {
    return false
  }

  let newValue = value
  if (typeof value === 'number') {
    newValue = newValue.toString()
  }
  return !!newValue.trim()
}

export const getFieldStateColor = (touched, invalid) => {
  let state = 'primary'
  if (touched) {
    state = invalid ? 'error' : 'success'
  }
  return state
}

export const getError = (error, pre) => (error?.response?.data?.code ? `${pre}${error?.response?.data?.code}` : 'SME_ERR_GENERIC')

export const dateFormatter = ({ value }) => {
  const date = new Date(`${value}`)
  return moment(date).format('DD.MM.YYYY')
}
