import React from 'react'
import Select, { defaultStyles, defaultTheme } from 'custom-item-select'
import { Badge, Container, Card, Table } from 'react-bootstrap'
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
            title="Props"
            description=""
        >
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Prop</th>
                        <th>Default</th>
                        <th>Values</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>items</td>
                        <td><code>{"[]"}</code></td>
                        <td>
                            Array with objects as select options:
                            <br />
                            <Code>
                                {`[
    {key: 'key1', component: <CustomItemComponent/>},
    {key: 'key2', component: <WhateverComponent/>}}
]
`}
                            </Code>
                        </td>
                        <td>Keys must be unique, Components may be same or different types.</td>
                    </tr>
                    <tr>
                        <td>multiselect</td>
                        <td>false</td>
                        <td>
                            <code>true | false</code>
                        </td>
                        <td>
                            If <code>true</code> you can select multiple options.
                        </td>
                    </tr>
                    <tr>
                        <td>placeholder</td>
                        <td><code>null</code></td>
                        <td>
                            <code>null | string</code>
                        </td>
                        <td>
                            The text if nothing is selected.
                        </td>
                    </tr>
                    <tr>
                        <td>internalStyles</td>
                        <td>
                            <code>defaultStyles()</code>
                        </td>
                        <td>
                            You can get and modify the object with styles by:
                            <Code>
                                {`
import { defaultStyles } from 'custom-item-select'  
//...
const styles = defaultStyles()
`}
                            </Code>
                        </td>
                        <td>
                            By this object all internal components are styled.
                        </td>
                    </tr>
                    <tr>
                        <td>onSelect</td>
                        <td><code>null</code></td>
                        <td>
                            If multiselect is <code>false</code>:<br />
                            <code>{"(selectedKey) => { /*...*/ }"}</code><br />
                            If multiselect is <code>true</code>:<br />
                            <code>{"(allSelectedKeysArray) => { /*...*/ }"}</code>
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td>animationTime</td>
                        <td><code>0.2</code> [sec]</td>
                        <td>Numeric value</td>
                        <td>Time of slide up/down animation</td>
                    </tr>
                    <tr>
                        <td>width</td>
                        <td>null</td>
                        <td><code>{'null | "auto" | numeric value'}</code></td>
                        <td>
                            Defines width of component.<br/>
                            If <code>null</code>, width is defined by internalStyles and style prop.
                            <br /><br/>
                            If <code>{'auto'}</code>, width is computed to contain all items in options
                            <br/><br/>
                            Use numeric value to set width in main component style.
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Example>
    )
}