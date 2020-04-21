import React from 'react'
import Select from 'custom-item-select'
import { Code, Example, Item, PersonBadge, PersonBadgeRandomProps as rand } from './utils'

const items = [
    { key: "Misou", component: <PersonBadge {...rand()}>Misou</PersonBadge> },
    { key: "Chalbran", component: <PersonBadge {...rand()}>Chalbran </PersonBadge> },
    { key: "Ana", component: <PersonBadge {...rand()}>Ana</PersonBadge> },
    { key: "Bentha", component: <PersonBadge {...rand()}>Bentha</PersonBadge> },
    { key: "Val", component: <PersonBadge {...rand()}>Val</PersonBadge> },
    { key: "Ingo", component: <PersonBadge {...rand()}>Very long Name: IngoIngoIngo</PersonBadge> },
    { key: "Zuk", component: <PersonBadge {...rand()}>Zuk</PersonBadge> },
    { key: "Naria", component: <PersonBadge {...rand()}>Naria</PersonBadge> },
    { key: "Miko", component: <PersonBadge {...rand()}>Miko</PersonBadge> },
]

export default function () {
    const [values, setValues] = React.useState(["Zuk"])
    const [single, setSingle] = React.useState("Zuk")

    const lastTwoValues = (keys) => {
        console.log(keys)
        setValues(keys.length > 2 ? keys.slice(-2) : keys)
    }

    return (
        <Example
            title="Controlled"
            description="You can control current selected items by passing array with keys to selectedKeys prop."
        >
            
            <br />
            <div>
                <b>Multiselect</b> values: {values && values.join()}<br/>
                <Select
                    multiselect
                    onSelect={keys => lastTwoValues(keys)}
                    selectedKeys={values}
                    items={items}
                    width='auto'
                    placeholder="select multiple options"
                />
                <br/>
                <br/>
                <b>Singleselect</b> value: {single}<br/>
                <Select
                    onSelect={key => setSingle(key)}
                    selectedKeys={single}
                    items={items}
                    width='auto'
                    placeholder="select multiple options"
                />
            </div>
            <br />
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
    { key: "Zuk", component: <PersonBadge {...rand()}>Zuk</PersonBadge> },
]
                    
function() {
    const [values, setValues] = React.useState(["Zuk"])
    const [single, setSingle] = React.useState("Zuk")

    const lastTwoValues = (keys) => {
        console.log(keys)
        setValues(keys.length > 2 ? keys.slice(-2) : keys)
    }

    return (
        <b>Multiselect</b> values: {values && values.join()}<br/>
        <Select
            multiselect
            onSelect={keys => lastTwoValues(keys)}
            selectedKeys={values}
            items={items}
            width='auto'
            placeholder="select multiple options"
        />
        <br/>
        <br/>
        <b>Singleselect</b> value: {single}<br/>
        <Select
            onSelect={key => setSingle(key)}
            selectedKeys={single}
            items={items}
            width='auto'
            placeholder="select multiple options"
        />
    )
}
                    `
                }
            </Code>
        </Example>
    )
}
