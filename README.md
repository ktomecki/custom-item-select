# custom-item-select

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/custom-item-select.svg)](https://www.npmjs.com/package/custom-item-select) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save custom-item-select
```

## Usage
```jsx
import React, { Component } from 'react'

import Select from 'custom-item-select'
import 'custom-item-select/dist/index.css'

const items = [
  { key: "one", component: <Item>One</Item> },
  { key: "two", component: <Item>Two</Item> },
  { key: "three", component: <Item>Three</Item> }
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
