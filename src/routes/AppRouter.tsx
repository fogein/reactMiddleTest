import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { RootState } from '../store'
import { PublicRouter, PrivateRouter, RoutesPath } from './index'

export const AppRouter = () => {
  const navigate = useNavigate()
  const {isAuth} = useSelector((state:RootState) => state.auth)
  
  React.useEffect(() => {
    if (!isAuth) {
      navigate(RoutesPath.LOGIN)
    } else 
    navigate(RoutesPath.EVENT)
  }, [isAuth, navigate])

  return (
    <Routes>  
      {
        !isAuth &&
        PublicRouter.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={<route.element />} />
          )
        })
      }

      {
        isAuth &&
        PrivateRouter.map((route) => {
          return <Route key={route.path} path={route.path} element={<route.element />} />
        })
      }
      <Route path='*' element={<div>Page not found 404</div>} />
    </Routes>
  )
}
