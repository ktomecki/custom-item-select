import React from 'react'
import { Container } from 'react-bootstrap'
import SingleSelect from './Example1'
import Multiselect from './Example2'
import Theming from './Example3'

//TODO:
// Props explanation,
// Compare behaviour to HTML select,
// Descriptions and texts,
// Different components in one select,
// Deal with forms

const App = () => {
  return (
    <Container style={{ maxWidth: 800 }}>
      <SingleSelect />
      <br />
      <Multiselect />
      <br/>
      <Theming/>
    </Container>
  )
}

export default App
