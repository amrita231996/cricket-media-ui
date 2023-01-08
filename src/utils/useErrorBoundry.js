import React from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes, getErrorType } from '../constants/globalConstants'

const useErrorBoundry = (errorCode = null) => {
  const navigate = useNavigate()
  const [error, throwError] = React.useState(errorCode)

  React.useEffect(() => {
    const errorType = getErrorType()[error]
    if (error && (errorType?.type === 'screen' || !errorType)) {
      if (error === 'ANY_SPECIFIC_ERROR') {
        navigate(errorType?.route, { replace: true, state: error })
      } else if (error === 'TEST_ERROR') {
        navigate(errorType?.route, { replace: true, state: error })
      } else {
        navigate(appRoutes.error.generic, { replace: true, state: error })
      }
    }
  }, [error, navigate])

  return [throwError]
}

export default useErrorBoundry
