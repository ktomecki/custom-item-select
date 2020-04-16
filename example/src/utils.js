import React from 'react'

import Select from 'custom-item-select'
import 'custom-item-select/dist/index.css'
import './theme.css'
import { Badge, Container, Card } from 'react-bootstrap'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';

SyntaxHighlighter.registerLanguage('javascript', js);

export function Item({ children }) {
    return (
        <Badge variant="primary">
            {children}
        </Badge>
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

