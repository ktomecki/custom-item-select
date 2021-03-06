import React from 'react'
import Select, { defaultStyles, defaultTheme } from 'custom-item-select'
import { Badge, Container, Card } from 'react-bootstrap'
import { Code, Example, Item, PersonBadge, PersonBadgeRandomProps as rand } from './utils'

const items = [
  { key: "Misou", component: <PersonBadge {...rand()}>Misou</PersonBadge> },
  { key: "Chalbran", component: <PersonBadge {...rand()}>Chalbran </PersonBadge> },
]

export default function () {
  const theme = defaultTheme()
  theme.selectedItemBackground = 'rgb(50, 100, 200)'
  theme.standardBoxShadow = '0px 0px 5px 0px rgba(50, 150, 200, 0.4)'

  const customStyles = defaultStyles()
  customStyles.dropdownButton.backgroundColor = 'rgba(0, 50, 200, 0.5)'

  return (
    <Example
      title="Theming"
      description=""
    >
      <code>style</code> prop modifies main container style.
      <Select
        style={{ display: 'block', margin: 20 }}
        items={items}
      />

      <Code>
        {
          `
//...
function() {
    return (
      <Select
        style={{ display: 'block', margin: 20 }}
        items={items}
      />
    )
}

`}
      </Code>
      
      <br />
      <hr/>
      <br />
        Use <code>defaultTheme</code> function to get and modify theme default values, for example changing the background color.
        Based on modified theme object, create custom internal styles and pass it to <code>internalStyles</code> prop.
        <br />
        <br/>
      <Select
        internalStyles={defaultStyles(theme)}
        items={items}
        placeholder="select one element..."
      />
      <br /><br />
      <Code>
        {
          `
import React from 'react'
import Select, {defaultStyles, defaultTheme} from 'custom-item-select'
//...
function() {
    const theme = defaultTheme()
    theme.selectedItemBackground = 'rgb(0, 50, 200)'
    theme.standardBoxShadow = '0px 0px 5px 0px rgba(0, 50, 200, 0.4)'
    return (
        <Select
            internalStyles={defaultStyles(theme)}
            items={items}
        />
    )
}

`}
      </Code>
      
      <br />
      <hr/>
      <br />

        You can also modify all internal components styles:<br />
        <br/>
      <Select
        internalStyles={customStyles}
        items={items}
        placeholder="select one element..."
      />
      <br />
      <br/>
      <Code>
        {
          `
import React from 'react'
import Select, {defaultStyles, defaultTheme} from 'custom-item-select'
//...
function() {
    const customStyles = defaultStyles()
    customStyles.dropdownButton.backgroundColor = 'rgba(0, 50, 200, 0.5)'
    return (
        <Select
            internalStyles={customStyles}
            items={items}
        />
    )
}

`}
      </Code>
    </Example>
  )
}