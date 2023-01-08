/* eslint-disable no-nested-ternary */
export const storageType = 'localStorage'

const convertType = (value) => {
  const v = Number(value)
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(v) ? v
    : value === 'undefined' ? undefined
      : value === 'null' ? null
        : value === 'true' ? true
          : value === 'false' ? false
            : value
}

export const storageAvailable = (type) => {
  const storage = window[type]
  try {
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return false
  }
}

export const getStorageItem = (key, storageType_ = storageType) => {
  let returnValue = null
  if (storageAvailable(storageType_)) {
    returnValue = window[storageType].getItem(key)
  }
  return convertType(returnValue)
}

export const setStorageItem = (key, value, storageType_ = storageType) => {
  if (storageAvailable(storageType_)) {
    window[storageType].setItem(key, value)
  }
}

export const deleteStorageItem = (key, storageType_ = storageType) => {
  if (storageAvailable(storageType_)) {
    window[storageType].removeItem(key)
  }
}

export const clearStorage = (storageType_ = storageType) => {
  if (storageAvailable(storageType_)) {
    window[storageType].clear()
  }
}
