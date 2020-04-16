import React from 'react'
import Select from 'custom-item-select'
import { Example, Item } from './utils'

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
