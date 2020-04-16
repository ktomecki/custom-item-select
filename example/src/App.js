import React from 'react'
import { Container } from 'react-bootstrap'
import SingleSelect from './Example1'
import Multiselect from './Example2'

//TODO:
// Props explanation,
// Theming and Styling,
// Compare behaviour to HTML select,
// Descriptions and texts,
// Different components in one select,
// Deal with forms

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
