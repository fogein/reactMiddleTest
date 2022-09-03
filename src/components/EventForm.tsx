import { Button, DatePicker, Form, Input, Select } from 'antd'
import React, { Dispatch, SetStateAction } from 'react'
import { useTypedSelector } from '../store'
import { useTypedDispatch } from '../store/index';
import { setEventThunk } from '../store/reducers/event/eventReducer';
import { UserType } from '../store/reducers/auth/authReducer';
import { formatDate } from '../utils';

export type EventsType = {
  author: string
  date: string
  description: string
  guests: string
}
export const EventForm: React.FC<{ guests: UserType[], setModal: Dispatch<SetStateAction<boolean>> }> = ({ guests, setModal }) => {
  const { user } = useTypedSelector(state => state.auth)
  const dispatch = useTypedDispatch()
  const [event, setEvent] = React.useState<EventsType>({
    author: '',
    date: '',
    description: '',
    guests: ''
  })
  const setDate = (date: Date) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date) })
    }
  }
  const onFinish = () => {
    dispatch(setEventThunk({ ...event, author: user.username }))
    setModal(false)
  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off">
      <Form.Item
        label='Описание события'
        name='description'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label='Дата события'
        name='date'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <DatePicker
          onChange={(e: any) => setDate(e)}

        />
      </Form.Item>

      <Form.Item
        label='Выбрать гостя'
        name='guests'
      >
        <Select onChange={(e) => setEvent({ ...event, guests: e })}>
          {guests.map((u) => {
            return (
              <Select.Option key={u.username} value={u.username}>{u.username}</Select.Option>
            )
          })}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
