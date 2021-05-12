import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'


export default function CreateAccount() {
    const email_val = useRef()
    const password_val = useRef()
    const password_confirm_val = useRef()
    const device_id_val = useRef()
    const { createaccount} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(event){
        event.preventDefault()

        if(password_val.current.value !== password_confirm_val.current.value){
            return setError('Passwords do not match')
        }
        try{
            setError('')
            setLoading(true)
            await createaccount(email_val.current.value, password_val.current.value, device_id_val.current.value)
            history.push('/dashboard')
        }
        catch{
            setError('Account not created')
        }
        setLoading(false)
        
    }

    return (
        <Card style={{width:'50%', marginTop:'5%', padding:'5px'}}>
            <Card.Body>
                <h2 className = "text-center">Create Account</h2>
            </Card.Body>
            <Form onSubmit={handleSubmit} style={{marginLeft:'30px'}}>
                <Form.Group>
                    <Form.Label><strong>Device ID</strong></Form.Label>
                    <Form.Control ref={device_id_val} required></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label><strong>Email</strong></Form.Label>
                    <Form.Control type="email" ref={email_val} required></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label><strong>Password</strong></Form.Label>
                    <Form.Control type="password" ref={password_val} required></Form.Control>
                </Form.Group>
                <Form.Group id="password_confirm">
                        <Form.Label><strong>Confirm Password</strong></Form.Label>
                        <Form.Control type = "password" ref = {password_confirm_val} required></Form.Control>
                    </Form.Group>
                <Button disabled={loading} type="submit" style={{padding:'10px', width:'90%', marginTop:'10px', marginLeft:'5px'}}>Create Account</Button>
            </Form>
            <hr></hr>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="text-center">
                <Link to='/login'>Login here</Link>
            </div>
        </Card>

            
    )
}
