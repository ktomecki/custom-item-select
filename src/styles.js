import React from 'react'

export function defaultTheme() {
    return {
        borderRadiusValue: '5px',
        selectedItemBackground: 'rgb(255, 255, 255)',
        selectedItemBorder: '1px solid rgba(0, 0, 0, 0.2)',
        borderBetween: '1px solid rgba(0, 0, 0, 0.1)',
        focusColor: 'rgba(49, 67, 230, 0.5)',
        optionsHr: '1px solid rgba(0, 0, 0, 0.05)',
        standardBoxShadow: '0px 2px 5px 0px rgba(0, 0, 0, 0.05)',
        buttonHoverShadow: 'inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2)'
    }
}

export function defaultStyles(theme = defaultTheme()) {
    return {
        container: {
            "position": "relative",
            "display": "inline-block",
            "borderRadius": theme.borderRadiusValue,
            userSelect: 'none'
        },
        inputContainer: {
            "position": "relative",
            "display": "grid",
            "gridTemplateColumns": "auto 30px",
            "borderRadius": theme.borderRadiusValue,
            boxShadow: theme.standardBoxShadow,
        },
        selectedItem: {
            "backgroundColor": theme.selectedItemBackground,
            minWidth: 50,
            "minHeight": "30px",
            "display": "flex",
            "borderTop": theme.selectedItemBorder,
            "borderBottom": theme.selectedItemBorder,
            "borderLeft": theme.selectedItemBorder,
            "borderRadius": `${theme.borderRadiusValue} 0 0 ${theme.borderRadiusValue}`,
            "padding": "2px",
            
        },
        placeholder: {
            "fontSize": "0.8rem",
            "color": "rgba(0, 0, 0, 0.2)"
        },
        multiselectedItems: {
            "flexWrap": "wrap"
        },
        itemWrapper: {
            "display": "grid",
            "gridTemplateColumns": "auto 1fr",
            height: 'min-content',
            margin: '2px',
            "backgroundColor": "rgba(0, 0, 0, 0.1)",
            "borderRadius": "4px",
        },
        wrapperBox: {
            "display": "flex",
            "alignItems": "center",
            padding: 2,
        },
        itemEraser: {
            "display": "inline-block",
            "paddingLeft": "2px",
            "paddingRight": "2px",
            "cursor": "pointer",
            marginTop: 'auto',
            marginBottom: 'auto',
            fontSize: '12px',
            transform: 'translateY(1px)'
        },
        itemEraserHover: {
            filter: 'invert(37%) sepia(99%) saturate(631%) hue-rotate(154deg) brightness(111%) contrast(102%)'
        },
        dropdownButton: {
            "display": "flex",
            justifyContent: 'center',
            "border": "none",
            "margin": "0px",
            "padding": "0px",
            "borderRadius": `0 ${theme.borderRadiusValue} ${theme.borderRadiusValue} 0`,
            "borderTop": theme.selectedItemBorder,
            "borderBottom": theme.selectedItemBorder,
            "borderRight": theme.selectedItemBorder,
            "borderLeft": theme.borderBetween,
            "cursor": "pointer"
        },
        dropdownIcon: {
            margin: 'auto 0'
        },
        dropdownButtonHover: {
            boxShadow: theme.buttonHoverShadow
        },
        optionsContainer: {
            border: theme.selectedItemBorder,
            "position": "absolute",
            "backgroundColor": "white",
            "display": "none",
            "height": "0px",
            "maxHeight": "250px",
            "overflowY": "hidden",
            "width": "100%",
            "zIndex": "100",
            "borderRadius": `0 0 ${theme.borderRadiusValue} ${theme.borderRadiusValue}`,
            boxShadow: theme.standardBoxShadow
        },
        item: {
            "padding": "2px",
            "cursor": "pointer",
            borderBottom: theme.optionsHr,
            borderTop: theme.optionsHr,
            position: 'relative'
        },
        itemHover: {
            filter: 'sepia(20%)',
            backgroundColor: 'rgba(0, 0, 0, 0.08)'
        },
        selectedOption: {
            //"filter": "brightness(30%)",
            //backgroundColor: 'hsl(0deg, 0%, 60%)'
        },
        selectedOptionOverlay: {
            position: "absolute", 
            height: '100%', 
            width: '100%', 
            //backgroundColor: 'rgba(22, 198, 12, 0.5)', 
            top: 0, 
            left: 0, 
            display: 'flex', 
            justifyContent: 'center'
        },
        selectedOptionIcon: {
            paddingLeft: '80%', 
            marginTop: 'auto', 
            marginBottom: 'auto' 
        }
    }
}