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
        <div>
            <h1 style={{padding:'10px'}}>Your Account</h1>
            {error && <Alert variant='danger'>{error}</Alert>}
            <p><strong>ID:</strong> {currentUser.uid}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <div>
                <Link to='/updateprofile' className='btn btn-primary'>Update Profile</Link>
            </div>
            <div>
                <Button type="submit" onClick={handleLogout}>Logout</Button>
            </div>
            
        </div>
    )
}