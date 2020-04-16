import React from 'react'
import { Container } from 'react-bootstrap'
import SingleSelect from './Example1'
import Multiselect from './Example2'

const App = () => {
  return (
    <Container style={{ maxWidth: 600 }}>
      <SingleSelect />
      <br />
      <Multiselect />
    </Container>
  )
}

export default App
