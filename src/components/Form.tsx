import { Button, Form, Input } from 'antd';
import React from 'react'
import { loginThunk, UserType } from '../store/reducers/auth/authReducer';
import { useTypedDispatch, useTypedSelector } from '../store/index';

export const FormComponent: React.FC = () => {
  const dispatch = useTypedDispatch()
  const { isLoading } = useTypedSelector(state => state.auth)
  
  const onFinish = (values: UserType) => {
    dispatch(loginThunk(values.username, values.password))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
 

  return (
    <Form
      style={{ background: 'rgb(0 0 0 / 5%)', padding: '30px' }}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Введите имя пользователя' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};