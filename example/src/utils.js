import React from 'react'

import Select from 'custom-item-select'
import 'custom-item-select/dist/index.css'
import './theme.css'
import { Badge, Container, Card } from 'react-bootstrap'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';
import color from 'color'

SyntaxHighlighter.registerLanguage('javascript', js);

const random = (min, max) => {
    return parseInt((max - min) * Math.random() + min)
}

export function Item({ children }) {
    return (
        <Badge variant="primary">
            {children}
        </Badge>
    )
}

export function PersonBadgeRandomProps() {
    return {
        bgColor: color.rgb(random(50, 200), random(50, 200), random(50, 200)),
        avatar: String.fromCharCode(random(65, 90))
    }
}

export function PersonBadge({ children, bgColor, avatar }) {

    const txtColor = bgColor.isDark() ? bgColor.lighten(0.8) : bgColor.darken(0.8)
    
    const containerStyle = {
        "display": "inline-block",
        "padding": ".25em .8em",
        "fontSize": "75%",
        "fontWeight": "700",
        "lineHeight": "1",
        "textAlign": "center",
        "whiteSpace": "nowrap",
        "verticalAlign": "baseline",
        "borderRadius": ".25rem",
        backgroundColor: bgColor,
        color: 'white',
        margin: 5,

    }

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'auto 2fr'
    }

    const avatarContainerStyle = {
        height: 20,
        width: 20,
        borderRadius: 15,
        boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.2)',
        transformOrigin: 'center',
        transform: 'scale(1.5)',
        backgroundColor: 'white',
        color: 'black',
        "fontSize": "75%",
        "fontWeight": "100",
        "lineHeight": "1",
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 0,
    }

    const textStyle = {
        marginLeft: 10,
        marginTop: 'auto',
        marginBottom: 'auto',
        color: txtColor
    }

    

    return (
        <div style={containerStyle}>
            <div style={gridStyle}>
                <div style={avatarContainerStyle}>
                    <span style={{}}>
                        {avatar}
                    </span>
                </div>
                <div style={textStyle}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export function Example({ title, description, children }) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                {children}
            </Card.Body>
        </Card>
    )
}

export function Code({ children }) {
    return (
        <SyntaxHighlighter style={docco}>
            {children}
        </SyntaxHighlighter>
    )
}

