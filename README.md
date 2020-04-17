# custom-item-select

The React component used to select options visualized by the HTML/React components. 

[![NPM](https://img.shields.io/npm/v/custom-item-select.svg)](https://www.npmjs.com/package/custom-item-select) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save custom-item-select
```

> No additional dependencies, React only!

## Demo
[custom-item-select](https://ktomecki.github.io/custom-item-select/)

## Usage
```jsx
import React, { Component } from 'react'
import Select from 'custom-item-select'

const items = [
  { key: "one", component: <Item>Custom item component</Item> },
  { key: "two", component: <Item>Custom item component 2</Item> },
  { key: "three", component: <AnotherItem>Three</AnotherItem> }
]

function() {
  const [value, setValue] = React.useState()
  return (
    <Select 
      items={items} 
      onSelect={(key) => setValue(key)} 
      placeholder="select one element..."
    />
  )
}
```

## License

MIT © [ktomecki](https://github.com/ktomecki)

> Made with create-react-library
