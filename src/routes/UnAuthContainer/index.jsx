import React from 'react'
import { Outlet } from 'react-router-dom'

const UnAuthContainer = () => {
    const render = () => (
        <Outlet />
    )

    return render()
}

export default UnAuthContainer
