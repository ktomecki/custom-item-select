import React from 'react'
import { defaultStyles, defaultTheme } from './styles'
import { DropdownIcon } from './utils'
import { useHover, useWidth, useSlide, useFlip } from 'react-my-hooks'

export { defaultStyles, defaultTheme }

const Context = React.createContext({ styles: {} })

function Iks() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'inherit' }} width="11.351" height="11.351" viewBox="0 0 11.351 11.351">
      <path id="Union_1" data-name="Union 1" d="M4.675,4.675,0,.127,4.675,4.675,9.224,0,4.675,4.675,9.351,9.224,4.675,4.675.127,9.351Z" transform="translate(1 1)" fill="none" stroke="#707070" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
    </svg>
  )
}

function useStyles() {
  const { styles } = React.useContext(Context)
  return styles
}

function Item({ element, onClick, isSelected }) {
  const { item, selectedOption, itemHover, selectedOptionOverlay, selectedOptionIcon } = useStyles()
  const ref = React.useRef()
  const hovered = useHover(ref)

  const currentStyle = {
    ...item,
    ...(isSelected ? selectedOption : {}),
    ...(hovered ? itemHover : {})
  }

  return (
    <div ref={ref} onClick={(e) => onClick(e)} style={currentStyle}>
      {element.component}
      {isSelected && (
        <div style={selectedOptionOverlay}>
          <div style={selectedOptionIcon}>✅</div>
        </div>
      )}
    </div>
  )
}

function EmptySelector({ text }) {
  const { placeholder, selectedItem } = useStyles()
  return (
    <div style={{ ...selectedItem, ...placeholder }}>
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
  const ref = React.useRef()
  const hovered = useHover(ref)

  const currentStyle = {
    ...itemEraser,
    ...(hovered ? itemEraserHover : {})
  }

  return (
    <div ref={ref} onClick={onClick} style={currentStyle}>
      <Iks />
    </div>
  )
}

function ItemWrapper({ children, onErase }) {
  const { itemWrapper, wrapperBox } = useStyles()
  return (
    <div style={{ margin: 'auto 0' }}>
      <div style={itemWrapper}>
        <div style={wrapperBox}>
          {children}
        </div>

        <ItemEraser onClick={onErase} />
      </div>
    </div>

  )
}

function SelectedItemsArray({ selected, onErase, placeholder }) {
  const { selectedItem, multiselectedItems } = useStyles()
  if (selected == null || !Array.isArray(selected) || selected.length === 0)
    return <EmptySelector text={placeholder} />

  return (
    <div style={{ ...selectedItem, ...multiselectedItems }}>
      {selected.map(el => (
        <ItemWrapper onErase={() => onErase(el)}>{el.component}</ItemWrapper>
      ))}
    </div>
  )
}

function DropdownButton({ onClick, rotate }) {
  const ref = React.useRef()
  const hovered = useHover(ref)
  const { dropdownButton, dropdownButtonHover, dropdownIcon } = useStyles()

  const currentStyle = {
    ...dropdownButton,
    ...(hovered ? dropdownButtonHover : {})
  }

  return (
    <button ref={ref} style={currentStyle} onClick={onClick}>
      <DropdownIcon style={dropdownIcon} rotate={rotate} />
    </button>
  )
}

export default function ({
  width,
  onSelect,
  selectedKeys,
  items = [],
  multiselect = false,
  placeholder,
  internalStyles = defaultStyles(),
  animationTime = 0.2,
  style = {},
  height
}) {

  const createValue = (selectedArray) => {
    if (multiselect === true) {
      return selectedArray.map(el => el.key)
    }
    return selectedArray.length > 0 ? selectedArray[0].key : null
  }

  const controlled = (selectedKeys != null && (multiselect === true && Array.isArray(selectedKeys) || (multiselect === false && (typeof selectedKeys === 'string' || selectedKeys instanceof String))))

  const [selected, dispatchSelected] = React.useReducer((prev, action) => {
    switch (action.type) {
      case 'reset': {
        if (controlled) {
          const filtered = multiselect ?
            selectedKeys.map(key => items.find(i => i.key == key)).filter(el => el != null) :
            [items.find(i => i.key == selectedKeys)]
          return { final: filtered, value: createValue(filtered) }
        }
        return prev
      }

      case 'erase': {
        const key = action.key
        const index = prev.final.findIndex(el => el.key === key)
        if (index == null)
          return prev

        const final = [...prev.final]
        final.splice(index, 1)
        const value = createValue(final)
        onSelect && onSelect(value)
        return controlled ? prev : { final, value }
      }

      case 'select': {
        const final = multiselect ? [...prev.final, action.element] : [action.element]
        const value = createValue(final)
        onSelect && onSelect(value)
        return controlled ? prev : { final, value }
      }
    }
  }, { final: [], value: [] })

  React.useEffect(() => {
    dispatchSelected({ type: 'reset' })
  }, [selectedKeys])


  const optionsRef = React.useRef()
  const containerRef = React.useRef()
  const timeoutBlurRef = React.useRef()

  const [show, setShow, _, setOptionsRef] = useSlide(animationTime, false)
  React.useEffect(() => setOptionsRef(optionsRef.current), [optionsRef.current])

  useFlip(optionsRef, show)
  const computedWidth = useWidth(optionsRef, width)
  const containerStyle = {
    ...internalStyles.container,
    ...(Number.isInteger(computedWidth) ? { width: multiselect ? computedWidth + 100 : computedWidth + 100 } : {}),
    ...style
  }

  const inputConteinerStyles = {
    ...internalStyles.inputContainer,
    ...(height != null && Number.isInteger(height) ? { minHeight: `${height}px` } : {})
  }


  const onErase = (element) => {
    dispatchSelected({ type: 'erase', key: element.key })
  }

  const selectedComponent = React.useMemo(() => {
    return multiselect === true ?
      <SelectedItemsArray placeholder={placeholder} onErase={onErase} selected={selected.final} /> :
      <SelectedItem placeholder={placeholder} selected={selected.final} />
  }, [selected.final, multiselect])

  const isSelected = React.useCallback((element) => {
    return selected.final.find(el => el.key == element.key) != null
  }, [selected.final])

  const onItemClick = React.useCallback((element, e) => {
    if (isSelected(element))
      return onErase(element)
    dispatchSelected({ type: 'select', element })
  }, [selected, multiselect])

  return (
    <Context.Provider
      value={{
        styles: internalStyles,
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
        <div style={inputConteinerStyles}>
          {selectedComponent}
          <DropdownButton onClick={() => setShow(!show)} rotate={show} />
        </div>
        <div ref={optionsRef} id="optionsContainer" style={internalStyles.optionsContainer}>
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
