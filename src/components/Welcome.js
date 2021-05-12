import React from 'react'
import {Card} from 'react-bootstrap'

export default function Welcome() {
    return (
        <div>
            <h1 style={{padding:'10px'}}>Welcome to Racing Rodents!</h1>
            <Card>
                <Card.Body>
                    <Card.Title>SmartWheel</Card.Title>
                    <Card.Text>Buy Here</Card.Text>
                </Card.Body>
                <Card.Img variant='bottom' src='https://compresspng.com/images/compresspng/icon.png'></Card.Img>
            </Card>
        </div>
    )
}

