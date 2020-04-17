import React from 'react'

export function useHover() {
    const [value, setValue] = React.useState(false);
    const ref = React.useRef(null);
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);
  
    React.useEffect(
      () => {
        const node = ref.current;
        if (node) {
          node.addEventListener('mouseover', handleMouseOver);
          node.addEventListener('mouseout', handleMouseOut);
  
          return () => {
            node.removeEventListener('mouseover', handleMouseOver);
            node.removeEventListener('mouseout', handleMouseOut);
          };
        }
      },
      [ref.current] // Recall only if ref changes
    );
    return [ref, value];
  }

  export function DropdownIcon() {
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