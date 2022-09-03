import React from 'react'
import { Layout, Row, Button, Modal } from 'antd';
import { EventCalendar } from '../../components/EventCalendar';
import { EventForm } from '../../components/EventForm';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { fetchEvents, setGuests } from '../../store/reducers/event/eventReducer';

export const EventPage: React.FC = () => {
  const [modal, setModal] = React.useState(false)
  const dispatch = useTypedDispatch()
  const { guests, events } = useTypedSelector(state => state.event)
  const { user } = useTypedSelector(state => state.auth)
  React.useEffect(() => {
    dispatch(setGuests())
    dispatch(fetchEvents(user.username))
  }, [dispatch, user.username])
  console.log(JSON.stringify(events));

  return (
    <Layout style={{ padding: '80px' }}>

      <EventCalendar
        events={events}
      />
      <Row justify='center' style={{ marginTop: '20px' }}>
        <Button size='large' type='dashed' onClick={() => setModal(true)}>
          Создать
        </Button>
      </Row>
      <Modal
        title='Добавить событие'
        footer={null}
        visible={modal}
        onCancel={() => setModal(false)}
      >
        <EventForm
          setModal={setModal}
          guests={guests}
        />
      </Modal>
    </Layout>
  )
}
