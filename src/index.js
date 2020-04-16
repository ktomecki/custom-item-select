import React from 'react'
import { defaultStyles, defaultTheme } from './styles'
import {DropdownIcon, useHover} from './utils'

const Context = React.createContext({ styles: {} })

function useStyles() {
  const { styles } = React.useContext(Context)
  return styles
}

function Item({ element, onClick, isSelected }) {
  const { item, selectedOption, itemHover } = useStyles()
  const [ref, hovered] = useHover()

  const currentStyle = {
    ...item,
    ...(isSelected ? selectedOption : {}),
    ...(hovered ? itemHover : {})
  }

  return (
    <div ref={ref} onClick={(e) => onClick(e)} style={currentStyle}>
      {element.component}
    </div>
  )
}

function EmptySelector({ text }) {
  const { placeholder } = useStyles()
  return (
    <div style={{ ...placeholder, display: 'flex' }}>
      <div style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 3 }}>
        {text}
      </div>
    </div>
  )
}

function SelectedItem({ selected, placeholder }) {
  const { selectedItem } = useStyles()
  if (selected == null || !Array.isArray(selected) || selected.length !== 1)
    return <EmptySelector text={placeholder} />

  const component = selected[0].component

  return (
    <div style={selectedItem}>
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        {component}
      </div>
    </div>
  )
}

function ItemEraser({ onClick }) {
  const { itemEraser, itemEraserHover } = useStyles()
  const [ref, hovered] = useHover()

  const currentStyle = {
    ...itemEraser,
    ...(hovered ? itemEraserHover : {})
  }

  return (
    <div ref={ref} onClick={onClick} style={currentStyle}>
      x
    </div>
  )
}

function ItemWrapper({ children, onErase }) {
  const { itemWrapper, wrapperBox } = useStyles()
  return (
    <div style={itemWrapper}>
      <div style={wrapperBox}>
        {children}
      </div>

      <ItemEraser onClick={onErase}/>
    </div>
  )
}

function SelectedItemsArray({ selected, onErase, placeholder }) {
  const { selectedItem, multiselectedItems } = useStyles()
  if (selected == null || !Array.isArray(selected))
    return <EmptySelector text={placeholder} />

  return (
    <div style={{ ...selectedItem, ...multiselectedItems }}>
      {selected.map(el => (
        <ItemWrapper onErase={() => onErase(el)}>{el.component}</ItemWrapper>
      ))}
    </div>
  )
}

function DropdownButton({ onClick }) {
  const [ref, hovered] = useHover()
  const { dropdownButton, dropdownButtonHover } = useStyles()

  const currentStyle = {
    ...dropdownButton,
    ...(hovered ? dropdownButtonHover : {})
  }

  return (
    <button ref={ref} style={currentStyle} onClick={onClick}>
      <DropdownIcon />
    </button>
  )
}

function useWidth(optionsRef, userWidth) {
  const [[width, isAuto], setWidth] = React.useReducer((prev, value) => {
    if(value === 'auto') {
      return [null, true]
    }
    if(Number.isInteger(value)) {
      return [value, false]
    }
    return [null, false]
  }, [50, false])

  React.useEffect(() => {
    setWidth(userWidth)
  }, [userWidth])

  React.useEffect(() => {
    if(optionsRef.current == null)
      return
    if(!isAuto)
      return

    const elem = optionsRef.current

    elem.style.visibility = 'hidden'
    elem.style.display = 'block'
    setTimeout(() => {
      setWidth(elem.scrollWidth)
      elem.style.display = 'none'
      elem.style.visibility = 'visible'
    })
  }, [optionsRef.current])

  return width
}

export default function ({ width, onSelect, items = [], multiselect = false, placeholder, styles = defaultStyles() }) {
  const [selected, setSelected] = React.useState([])

  const optionsRef = React.useRef()
  const containerRef = React.useRef()
  const timeoutBlurRef = React.useRef()
  const timeoutShowRef = React.useRef()

  const computedWidth = useWidth(optionsRef, width)
  const containerStyle = {
    ...styles.customItemSelect,
    ...(Number.isInteger(computedWidth) ? {width: multiselect ? computedWidth + 100 : computedWidth} : {})
  }

  const [show, setShow] = React.useReducer((s, value) => {

    clearTimeout(timeoutShowRef.current)
    const animationTime = 0.2;
    const slideDown = (elem) => {
      elem.style.display = 'block'
      elem.style.transition = `height, ${animationTime}s linear`
      elem.style.height = `${elem.scrollHeight}px`;
      timeoutShowRef.current = setTimeout(() => {
        elem.style["overflow-y"] = "auto";
      }, animationTime * 1000.0)
    }

    const slideUp = (elem) => {
      elem.style["overflow-y"] = "hidden";
      elem.style.transition = `height, ${animationTime}s linear`
      elem.style.height = `0px`;
      timeoutShowRef.current = setTimeout(() => {
        elem.style.display = "none";
      }, animationTime * 1000.0)
    }

    if (value === true)
      slideDown(optionsRef.current);
    else
      slideUp(optionsRef.current)
    return value
  }, false)

 

  const onErase = (element) => {
    setSelected((prev) => {
      const index = selected.findIndex(el => el.key === element.key)
      if (index == null)
        return prev
      prev.splice(index, 1)
      return [...prev]
    })
  }

  const selectedComponent = React.useMemo(() => {
    return multiselect === true ?
      <SelectedItemsArray placeholder={placeholder} onErase={onErase} selected={selected} /> :
      <SelectedItem placeholder={placeholder} selected={selected} />
  }, [selected, multiselect])

  const isSelected = React.useCallback((element) => {
    return selected.find(el => el.key == element.key) != null
  }, [selected])

  const onItemClick = React.useMemo(() => {
    if (multiselect === true) {
      return (element, e) => {
        if (isSelected(element))
          return onErase(element)
        setSelected(prev => [...prev, element])
      }
    }
    return (element, e) => {
      setSelected([element])
    }
  }, [selected, multiselect])

  const value = React.useMemo(() => {
    if (multiselect === true) {
      return selected.map(el => el.key)
    }
    return selected.length > 0 ? selected[0].key : null
  }, [selected])

  React.useEffect(() => {
    onSelect && onSelect(value)
  }, [value])

  return (
    <Context.Provider
      value={{
        styles,
        computedWidth
      }}
    >
      <div
        ref={containerRef}
        tabIndex={0}
        style={containerStyle}
        onBlur={() => timeoutBlurRef.current = setTimeout(() => setShow(false), 100)}
        onFocus={() => clearTimeout(timeoutBlurRef.current)}
      >
        <div style={styles.inputContainer}>
          {selectedComponent}
          <DropdownButton onClick={() => setShow(!show)} />
        </div>
        <div ref={optionsRef} id="optionsContainer" style={styles.optionsContainer}>
          {items.map(el => (
            <Item isSelected={isSelected(el)} key={`item-${el.key}`} onClick={() => {
              onItemClick(el)
              if (!multiselect)
                setShow(false)
            }} element={el} />
          ))}
        </div>
      </div>
    </Context.Provider>
  )
}
