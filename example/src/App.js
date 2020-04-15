import React from 'react'

import Select from 'custom-item-select'
import 'custom-item-select/dist/index.css'
import './theme.css'
import { Badge, Container, Card } from 'react-bootstrap'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';
 
SyntaxHighlighter.registerLanguage('javascript', js);

function Item({ children }) {
  return (
    <Badge variant="primary">
      {children}
    </Badge>
  )
}

function Example({ title, description, children }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        {children}
      </Card.Body>
    </Card>
  )
}

const items = [
  { key: "one", component: <Item>One</Item> },
  { key: "two", component: <Item>Two</Item> },
  { key: "three", component: <Item>Three</Item> },
  { key: "4", component: <Item>4</Item> },
  { key: "5", component: <Item>5</Item> },
  { key: "6", component: <Item>6</Item> },
  { key: "7", component: <Item>7</Item> },
  { key: "8", component: <Item>8</Item> },
  { key: "9", component: <Item>9</Item> },
]

function SingleSelect() {
  const [value, setValue] = React.useState()
  return (
    <Example
      title="Basic use"
      description="Standard HTML single-select behaviour with custom item components."
    >
      Example component as item: <Item>Example</Item>
      <br/>
      Value: {value}
      <br />
      <Select 
        items={items} 
        onSelect={(key) => setValue(key)} 
        placeholder="select one element..."
      />

      <SyntaxHighlighter style={docco}>
       {
`const [value, setValue] = React.useState();
const items = [
  { key: "one", component: <Item>One</Item> },
  //...
  { key: "nine", component: <Item>Nine</Item> },
];
return (
  <Select onSelect={key => setValue(key)} items={items} />
)`}
      </SyntaxHighlighter>

    </Example>
  )
}

function Multiselect() {
  const [values, setValues] = React.useState()
  return (
    <Example
      title="Multiselect"
      description=""
    >
      Values: {values && values.map(v => `${v}, `)}
      <br />
      <Select onSelect={keys => setValues(keys)} multiselect items={items} />
    </Example>
  )
}



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
