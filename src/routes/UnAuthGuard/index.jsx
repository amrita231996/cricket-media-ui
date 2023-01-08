/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from "react-router-dom";

import { appRoutes } from '../../constants/appConstants'
import { getAuthStatus } from '../../utils/auth'
import { clearStorage, getStorageItem } from '../../utils/sessionStorage'

const UnAuthGuardRoute = ({ children }) => {
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
        setIsValidate(true)
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          clearStorage()
          navigate('/login');
        }
      });
  };

  useEffect(() => { if (!isValid) { validateToken() } }, [isValid])

  const publicRoute = () => (getAuthStatus() && isValid && 
  (window.location.origin + '/' === window.location.href) ? <Navigate to={appRoutes.Feed} replace /> : children)
  return publicRoute()
}

export default UnAuthGuardRoute
