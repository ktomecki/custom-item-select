import React from 'react'
import Select from 'custom-item-select'
import { Badge, Container, Card } from 'react-bootstrap'
import { Code, Example, Item, PersonBadge, PersonBadgeRandomProps as rand } from './utils'

const items = [
    { key: "Misou", component: <PersonBadge {...rand()}>Misou</PersonBadge> },
    { key: "Chalbran", component: <PersonBadge {...rand()}>Chalbran </PersonBadge> },
    { key: "Ana", component: <PersonBadge {...rand()}>Ana</PersonBadge> },
    { key: "Bentha", component: <PersonBadge {...rand()}>Bentha</PersonBadge> },
    { key: "Val", component: <PersonBadge {...rand()}>Val</PersonBadge> },
    { key: "Ingo", component: <PersonBadge {...rand()}>Ingo</PersonBadge> },
    { key: "Zuk", component: <PersonBadge {...rand()}>Zuk</PersonBadge> },
    { key: "Naria", component: <PersonBadge {...rand()}>Naria</PersonBadge> },
    { key: "Miko", component: <PersonBadge {...rand()}>Miko</PersonBadge> },
]

const exampleItem = <PersonBadge {...rand()}>Misou</PersonBadge>

export default function() {
    const [value, setValue] = React.useState()
    return (
      <Example
        title="Basic useage"
        description="Standard HTML single-select behaviour with custom item components."
      >
        Example component as item: {exampleItem}
        <br />
        Value: {value}
        <br />
        <Select
          items={items}
          onSelect={(key) => setValue(key)}
          placeholder="select one element..."
          width='auto'
          height={40}
        />
        <br/>
        <br/>
        <Code>
        {
          `
import React from 'react'
import Select from 'custom-item-select'
//...

const items = [
  { key: "Misou", component: <PersonBadge {...rand()}>Misou</PersonBadge> },
  //...
  { key: "Miko", component: <PersonBadge {...rand()}>Miko</PersonBadge> },
]

function() {
  const [values, setValues] = React.useState()
  return (
    <Select
      items={items}
      onSelect={(key) => setValue(key)}
      placeholder="select one element..."
    />
  )
}

`}
      </Code>
      </Example>
    )
  }