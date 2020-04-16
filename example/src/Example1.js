import React from 'react'
import Select from 'custom-item-select'
import { Badge, Container, Card } from 'react-bootstrap'
import { Code, Example, Item } from './utils'

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

export default function() {
    const [value, setValue] = React.useState()
    return (
      <Example
        title="Basic use"
        description="Standard HTML single-select behaviour with custom item components."
      >
        Example component as item: <Item>Example</Item>
        <br />
        Value: {value}
        <br />
        <Select
          items={items}
          onSelect={(key) => setValue(key)}
          placeholder="select one element..."
        />
  
        <Code>
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
        </Code>
      </Example>
    )
  }