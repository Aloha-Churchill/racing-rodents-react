import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'

export default function UpdateProfile() {
    const email_val = useRef()
    const password_val = useRef()
    const password_confirm_val = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(event){
        event.preventDefault()
        if(password_val.current.value !== password_confirm_val.current.value){
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError('')
        if(email_val.current.value !== currentUser.email){
            promises.push(updateEmail(email_val.current.value))
        }
        if(password_val.current.value){
            promises.push(updatePassword(password_val.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
        
    }

    return (
        <Card style={{width:'50%', marginTop:'5%', padding:'5px'}}>
            <Card.Body>
                <h2 className = "text-center">Update Profile</h2>
            </Card.Body>
            <Form onSubmit={handleSubmit} style={{marginLeft:'30px'}}>
            <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref = {email_val} required defaultValue={currentUser.email}></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type = "password" ref = {password_val} placeholder='Leave blank to not change'></Form.Control>
                    </Form.Group>
                    <Form.Group id="password_confirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type = "password" ref = {password_confirm_val} placeholder='Leave blank to not change'></Form.Control>
                    </Form.Group>
                <Button disabled={loading} type="submit" style={{padding:'10px', width:'90%', marginTop:'10px', marginLeft:'5px'}}>Update Profile</Button>
            </Form>
            <hr></hr>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="text-center">
                <Link to='/'>Cancel</Link>
            </div>
        </Card>
    )
}
