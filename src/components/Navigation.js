import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'

export default function Navigation() {
    return (
        <Navbar bg='light' expand='lg' style={{paddingLeft:'20px'}}>
            <Navbar.Brand href='/'>Home</Navbar.Brand>
            <Nav.Link href='/login'>Login</Nav.Link>
            <Nav.Link href='/createaccount'>Create Account</Nav.Link>
            <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
            <Nav.Link href='/profile'>Profile</Nav.Link>
        </Navbar>
    )
}