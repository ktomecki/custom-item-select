import React from 'react'

export function DropdownIcon({ rotate, style }) {
  const styles = {
    ...style,
    ...(rotate ? { transform: 'rotate(180deg)' } : {})
  }
  return (
    <svg style={styles} x="0px" y="0px" width="10px" height="10px" viewBox="0 0 255 255" space="preserve">
      <g>
        <g id="arrow-drop-down">
          <polygon points="0,63.75 127.5,191.25 255,63.75" />
        </g>
      </g>
    </svg>
  )
}