import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import type { MenuProps } from 'antd';
import { RoutesPath } from '../routes';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useTypedDispatch } from '../store/index';
import { logoutThunk } from '../store/reducers/auth/authReducer';

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuProps['items']>()
  const { isAuth,user } = useSelector((state: RootState) => state.auth)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (isAuth) {
      setMenuItems([
        { label: 'Main', key: 'Main' },
        { label: user.username, key: 'ProfileName', children: [{ label: 'Exit', key: 'Exit' }] },
      ])
    } else {
      setMenuItems([
        { label: 'Login', key: 'Login' }
      ])
    }
  }, [isAuth,user])

  const clickHandler = ({ key }: { key: string }) => {
    if (key === 'Main') {
      navigate(RoutesPath.EVENT)
    }
    else if (key === 'Login') {
      navigate(RoutesPath.LOGIN)
    }
    else if (key === 'Exit') {
      dispatch(logoutThunk())
    }
  }
  return (
    <Header className="header">
      <Menu theme="dark" mode="horizontal" items={menuItems} onClick={clickHandler} />
    </Header>
  )
}
