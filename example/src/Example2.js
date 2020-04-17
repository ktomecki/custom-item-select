import React from 'react'
import Select from 'custom-item-select'
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

export default function () {
  const [values, setValues] = React.useState()
  return (
    <Example
      title="Multiselect"
      description=""
    >
      Values: {values && values.map(v => `${v}, `)}
      <br />
      <div>
        <Select
          multiselect
          onSelect={keys => setValues(keys)}
          items={items}
          width='auto'
          placeholder="select multiple options"
        />
      </div>
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
      multiselect
      onSelect={keys => setValues(keys)}  
      items={items} 
      width='auto'
      placeholder="select multiple options"
    />
  )
}

`}
      </Code>

    </Example>
  )
}
