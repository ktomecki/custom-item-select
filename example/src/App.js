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
      <SingleSelect />
      <br />
      <Multiselect />
      <br/>
      <PropsExample/>
      <br/>
      <Theming/>
      <br/>
      <Controlled/>
      <div style={{marginBottom: 500}}></div>
      <br/>
      <select value={value}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
     
    </Container>
  )
}

export default App
