import React, {useEffect, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {db} from '../firebase'
import {useHistory, Link} from 'react-router-dom'
import {Button, Alert} from 'react-bootstrap'

export default function LoadData() {
    const {currentUser, logout} = useAuth()
    const [userData, setUserData] = useState(null)
    const history = useHistory()
    const [error, setError] = useState('')

    useEffect(() => {
        const ref = db.ref('Users')
        ref.on('value', (snapshot) => {
            let wheel_data = snapshot.val()
            let id_regex = new RegExp(`.....${currentUser.uid}`)
            let key_arr = Object.keys(wheel_data)
            let key = key_arr.find(value => id_regex.test(value))
            let user_data = wheel_data[key]
            console.log(user_data)
            setUserData(user_data)
        })

        return () => ref.off();
    }, [])
    
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
            <pre>{JSON.stringify(userData)}</pre>
            <h1>Dashboard</h1>
            {error && <Alert variant='danger'>{error}</Alert>}
            <div>
                <Link to='/updateprofile' className='btn btn-primary'>Update Profile</Link>
            </div>
            <Button type="submit" onClick={handleLogout}>Logout</Button>
        </div>
    )
}
