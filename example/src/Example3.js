import React from 'react'
import Select, {defaultStyles, defaultTheme} from 'custom-item-select'
import { Badge, Container, Card } from 'react-bootstrap'
import { Code, Example, Item, PersonBadge, PersonBadgeRandomProps as rand } from './utils'

const items = [
    { key: "Misou", component: <PersonBadge {...rand()}>Misou</PersonBadge> },
    { key: "Chalbran", component: <PersonBadge {...rand()}>Chalbran </PersonBadge> },
]

export default function() {
    const theme = defaultTheme()
    theme.selectedItemBackground = 'rgb(50, 100, 200)'
    theme.standardBoxShadow = '0px 0px 5px 0px rgba(50, 150, 200, 0.4)'

    const customStyles = defaultStyles()
    customStyles.dropdownButton.backgroundColor = 'rgba(0, 50, 200, 0.5)'
    customStyles.container.display = 'block'

    return (
      <Example
        title="Theming"
        description=""
      >
        Theme modification, for example changing the background color:<br/>
        <Select
          styles={defaultStyles(theme)}
          items={items}
          placeholder="select one element..."
        />
        <br/><br/>
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
            styles={defaultStyles(theme)}
            items={items}
        />
    )
}

`}
        </Code>
        <br/>

        You can also modify all component styles:<br/>
        <Select
          styles={customStyles}
          items={items}
          placeholder="select one element..."
        />
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
    customStyles.container.display = 'block'
    return (
        <Select
            styles={customStyles}
            items={items}
        />
    )
}

`}
        </Code>
      </Example>
    )
  }