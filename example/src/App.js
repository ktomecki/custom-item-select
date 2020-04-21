import React from 'react'
import { Container } from 'react-bootstrap'
import SingleSelect from './Example1'
import Multiselect from './Example2'
import Theming from './Example3'
import PropsExample from './PropsExample'
import Controlled from './Example4'

//TODO:
// Props explanation,
// Compare behaviour to HTML select,
// Descriptions and texts,
// Different components in one select,
// Deal with forms

const App = () => {
  const [value, setValue] = React.useState("1")
  return (
    <Container style={{ maxWidth: 1200 }}>
      <h1><b>custom-item-select</b> demo</h1>
      <a target="_blank" href="https://github.com/ktomecki/custom-item-select">GitHub</a>
      {" | "}
      <a target="_blank" href="https://www.npmjs.com/package/custom-item-select" alt="NPM"><img src="https://img.shields.io/npm/v/custom-item-select.svg"/></a>
      <br/>
      <br/>
      <SingleSelect />
      <br />
      <Multiselect />
      <br/>
      <Controlled/>
      <br/>
      <PropsExample/>
      <br/>
      <Theming/>
      <br/>     
    </Container>
  )
}

export default App
