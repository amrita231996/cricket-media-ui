import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from "react-router-dom";

import { appRoutes } from '../../constants/appConstants'
import { getAuthStatus } from '../../utils/auth'
import { clearStorage, getStorageItem } from '../../utils/sessionStorage'

const AuthGuardRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isValid, setIsValidate] = useState(false)
  const navigate = useNavigate()

  const validateToken = () => {
    const accessToken = getStorageItem("token");
    var validateOptions = {
      method: "get",
      url: global.config.ROOTURL.prod + "/auth/validateToken",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    axios(validateOptions)
      .then((response) => {
        if (response.data.status) {
          setIsLoading(false)
          setIsValidate(true)
        }
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          clearStorage()
          navigate('/login');
        }
      });
  };

  useEffect(() => { if (!isValid) { validateToken() } }, [isValid])

  const firstName = getStorageItem('first_name');
  const lastName = getStorageItem('last_name');
  const fullName = `${firstName} ${lastName}`
  const privateRoute = () => !getAuthStatus() && !isValid
    ? <Navigate to={appRoutes.login} replace />
    : isValid ? children : ((!firstName && !lastName) || !fullName)
      && <Navigate to={appRoutes.onboarding} replace />
  return !isLoading && privateRoute()
}

export default AuthGuardRoute
