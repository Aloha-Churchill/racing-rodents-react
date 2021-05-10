import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link} from 'react-router-dom'

export default function ForgotPassword() {
    const email_val = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(event){
        event.preventDefault()
        try{
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(email_val.current.value)
            setMessage('Check your email to reset password')
        }
        catch{
            setError('Failed to reset password')
        }
        setLoading(false)
        
    }
    return (
        <Card style={{width:'50%', marginTop:'5%', padding:'5px'}}>
            <Card.Body>
                <h2 className = "text-center">Reset Password</h2>
            </Card.Body>
            <Form onSubmit={handleSubmit} style={{marginLeft:'30px'}}>
            <Form.Group>
                <Form.Label><strong>Email</strong></Form.Label>
                <Form.Control type="email" ref={email_val} required></Form.Control>
            </Form.Group>
            <Button disabled={loading} type="submit" style={{padding:'10px', width:'90%', marginTop:'10px', marginLeft:'5px'}}>Reset Password</Button>
            </Form>
            <hr></hr>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <div className="text-center">
                <Link to='/login'>Back to Login</Link>
            </div>
        </Card>
    )
}
