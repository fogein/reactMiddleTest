import React from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { AppRouter } from './routes/AppRouter';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { actions, UserType } from './store/reducers/auth/authReducer';
import { useTypedDispatch } from './store/index';

export const App = () => {
  const {setUser,setAuth} = actions
  const dispatch = useTypedDispatch()
  React.useEffect(() => {
    if(!!localStorage.getItem('auth')) {
      dispatch(setUser({username:localStorage.getItem('user')}as UserType))
      dispatch(setAuth(true))
    }
  },[dispatch, setAuth, setUser])

  return (
    <Layout>
      <NavBar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
}

