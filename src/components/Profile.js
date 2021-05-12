import React, {useState} from 'react'
import {Button, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'

export default function Profile() {
    const [error, setError] = useState('')
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    async function handleLogout(){
        setError('')
        try{
            await logout()
            history.pushState('/login')
        }
        catch{
            setError('Failed to logout')
        }
    }
    return (
        <div class='container rounded my-3 bg-light pt-4'>
            <h1 class='text-center' style={{padding:'10px'}}>Your Account</h1>
            {error && <Alert variant='danger'>{error}</Alert>}
            <p style={{marginLeft: '25px'}}><strong>Email:</strong> {currentUser.email}</p>
            <div style={{marginBottom: '30px'}}>
                <Link to='/updateprofile' className='btn btn-primary' style={{marginLeft: '20px'}}>Update Profile</Link>
                <Button type="submit" onClick={handleLogout} style={{marginLeft: '20px'}}>Logout</Button>
            </div>
            
        </div>
    )
}