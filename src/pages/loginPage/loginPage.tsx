import { Layout, Row } from 'antd'
import React from 'react'
import { FormComponent } from '../../components/Form'

export const LoginPage:React.FC = () => {
  return (
    <Layout >
      <Row  justify='center' align='middle' className="h100">
        <FormComponent/>
      </Row>
    </Layout>
  )
}
