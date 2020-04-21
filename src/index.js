import React from 'react'
import { defaultStyles, defaultTheme } from './styles'
import { DropdownIcon, useHover } from './utils'

export { defaultStyles, defaultTheme }

const Context = React.createContext({ styles: {} })

function useStyles() {
  const { styles } = React.useContext(Context)
  return styles
}

function Item({ element, onClick, isSelected }) {
  const { item, selectedOption, itemHover, selectedOptionOverlay, selectedOptionIcon } = useStyles()
  const [ref, hovered] = useHover()

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
          <div style={selectedOptionIcon}>{hovered ? "✖" : "✅"}</div>
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
  const [ref, hovered] = useHover()

  const currentStyle = {
    ...itemEraser,
    ...(hovered ? itemEraserHover : {})
  }

  return (
    <div ref={ref} onClick={onClick} style={currentStyle}>
      ✖
    </div>
  )
}

function ItemWrapper({ children, onErase }) {
  const { itemWrapper, wrapperBox } = useStyles()
  return (
    <div style={{margin: 'auto 0'}}>
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
  const [ref, hovered] = useHover()
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

function useWidth(optionsRef, userWidth) {
  const [[width, isAuto], setWidth] = React.useReducer((prev, value) => {
    if (value === 'auto') {
      return [null, true]
    }
    if (Number.isInteger(value)) {
      return [value, false]
    }
    return [null, false]
  }, [50, false])

  React.useEffect(() => {
    setWidth(userWidth)
  }, [userWidth])

  React.useEffect(() => {
    if (optionsRef.current == null)
      return
    if (!isAuto)
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

function useSlide(optionsRef, animationTime) {

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

  const timeoutShowRef = React.useRef()

  const [show, setShow] = React.useReducer((s, value) => {
    clearTimeout(timeoutShowRef.current)

    if (value === true) {
      slideDown(optionsRef.current);
    }
    else {
      slideUp(optionsRef.current)
    }

    return value
  }, false)

  return [show, setShow]
}

function useFlip(optionsRef, show, position = 'bottom', auto = true) {

  const flipTop = (elem) => {
    elem.style.transformOrigin = 'bottom'
    elem.style.top = 'unset'
    elem.style.bottom = '100%'
  }

  const flipBottom = (elem) => {
    elem.style.transform = ''
    elem.style.bottom = 'unset'
    elem.style.top = 'unset'
  }

  const [current, setCurrent] = React.useState(position)
  React.useEffect(() => setCurrent(position), [position])

  const checkPosition = () => {
    if (optionsRef.current == null)
      return

    if (show !== true)
      return

    const y = optionsRef.current.parentElement.getBoundingClientRect().top
    const screenHeight = window.innerHeight
    const height = optionsRef.current.scrollHeight

    if (y + height + 100 > screenHeight && y - height > 0) {
      if (current != 'top')
        setCurrent('top')
    } else if (y + height - 100 < screenHeight) {
      if (current != 'bottom')
        setCurrent('bottom')
    }
  }

  React.useEffect(() => {
    if (optionsRef.current == null)
      return
    if (show !== true)
      return

    switch (current) {
      case 'bottom': return flipBottom(optionsRef.current);
      case 'top': return flipTop(optionsRef.current)
    }
  }, [optionsRef.current, show, current])

  React.useEffect(() => {
    if (optionsRef.current == null)
      return
    if (auto !== true)
      return

    checkPosition()
    document.addEventListener('scroll', checkPosition)
    return () => {
      document.removeEventListener('scroll', checkPosition)
    }
  }, [optionsRef.current, auto, show, current])

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

  const [show, setShow] = useSlide(optionsRef, animationTime)

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
