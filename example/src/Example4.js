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
            Values: {values && values.map(v => `${v}, `)}
            <br />
            <div>
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
                <Select
                    onSelect={key => setSingle(key)}
                    selectedKeys={single}
                    items={items}
                    width='auto'
                    placeholder="select multiple options"
                />
            </div>
            <br />
        </Example>
    )
}
