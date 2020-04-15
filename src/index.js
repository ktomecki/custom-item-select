import React from 'react'
import styles from './styles.scss'

function DropdownIcon() {
  return (
    <svg x="0px" y="0px" width="10px" height="10px" viewBox="0 0 255 255" space="preserve">
      <g>
        <g id="arrow-drop-down">
          <polygon points="0,63.75 127.5,191.25 255,63.75" />
        </g>
      </g>
    </svg>
  )
}

function Item({ element, onClick, isSelected }) {
  return (
    <div onClick={(e) => onClick(e)} className={styles.item + (isSelected ? ` ${styles.selectedOption}` : '')}>
      {element.component}
    </div>
  )
}

function EmptySelector({text}) {
  return (
    <div className={styles.selectedItem + " " + styles.placeholder}>
      <div>
        {text}
      </div>
      
    </div>
  )
}

function SelectedItem({ selected, placeholder }) {

  if (selected == null || !Array.isArray(selected) || selected.length !== 1)
    return <EmptySelector text={placeholder}/>

  const component = selected[0].component

  return (
    <div className={styles.selectedItem}>
      {component}
    </div>
  )
}

function ItemWrapper({ children, onErase }) {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.wrapperBox}>
        {children}
      </div>
      
      <div onClick={onErase} className={styles.itemEraser}>
        x
      </div>
    </div>
  )
}

function SelectedItemsArray({ selected, onErase, placeholder }) {
  if (selected == null || !Array.isArray(selected))
    return <EmptySelector text={placeholder}/>

  return (
    <div className={styles.selectedItem + " " + styles.multiselectedItems}>
      {selected.map(el => (
        <ItemWrapper onErase={() => onErase(el)}>{el.component}</ItemWrapper>
      ))}
    </div>
  )
}

export default function ({ onSelect, items = [], multiselect = false, placeholder }) {

  const optionsRef = React.useRef()
  const containerRef = React.useRef()
  const timeoutBlurRef = React.useRef()
  const timeoutShowRef = React.useRef()

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
    console.log(optionsRef)
    return value
  }, false)

  const [selected, setSelected] = React.useState([])

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
    if(multiselect === true) {
      return selected.map(el => el.key)
    }
    return selected.length > 0 ? selected[0].key : null
  }, [selected])

  React.useEffect(() => {
    onSelect && onSelect(value)
  }, [value])

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={styles.customItemSelect}
      onBlur={() => timeoutBlurRef.current = setTimeout(() => setShow(false), 100)}
      onFocus={() => clearTimeout(timeoutBlurRef.current)}
    >
      <div className={styles.inputContainer}>
        {selectedComponent}
        <button className={styles.dropdownButton} onClick={() => setShow(!show)}> <DropdownIcon /></button>
      </div>
      <div ref={optionsRef} id="optionsContainer" className={styles.optionsContainer}>
        {items.map(el => (
          <Item isSelected={isSelected(el)} key={`item-${el.key}`} onClick={() => {
            onItemClick(el)
            if (!multiselect)
              setShow(false)
          }} element={el} />
        ))}
      </div>
    </div>
  )
}
