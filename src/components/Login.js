import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import Welcome from './Welcome'

export default function Login() {
    const email_val = useRef()
    const password_val = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(event){
        event.preventDefault()
        try{
            setError('')
            setLoading(true)
            await login(email_val.current.value, password_val.current.value)
            history.push('/dashboard')
        }
        catch{
            setError('Login failed')
        }
        setLoading(false)
        
    }
    return (
        <>
        <Card style={{width:'50%', marginTop:'5%', padding:'5px'}}>
            <Card.Body>
                <h2 className = "text-center">Login</h2>
            </Card.Body>
            <Form onSubmit={handleSubmit} style={{marginLeft:'30px'}}>
                <Form.Group>
                    <Form.Label><strong>Email</strong></Form.Label>
                    <Form.Control type="email" ref={email_val} required></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label><strong>Password</strong></Form.Label>
                    <Form.Control type="password" ref={password_val} required></Form.Control>
                </Form.Group>
                <Button disabled={loading} type="submit" style={{padding:'10px', width:'90%', marginTop:'10px', marginLeft:'5px'}}>Login</Button>
            </Form>
            <hr></hr>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="text-center">
                <Link to='/createaccount'>Create account here</Link>
                <br></br>
                <Link to='/forgotpassword' style={{text:'center'}}>Forgot Password?</Link>
            </div>
        </Card>
        </>
    )
}
