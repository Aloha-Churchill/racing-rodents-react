import React, {useState} from 'react'
import {Button, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import {db} from '../firebase'

export default function Dashboard() {
    const [error, setError] = useState('')
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    let rootRef = db.ref('Users')
    rootRef.on('value', getData, errData)
    function getData(data){
        let wheel_data = data.val()
        let id_regex = new RegExp(`.....${currentUser.uid}`)
        let key_arr = Object.keys(wheel_data)
        let key = key_arr.find(value => id_regex.test(value))
        let account_created = wheel_data[key].account_created
        console.log(wheel_data[key].distance)
    }

    function errData(){
        console.log('Error getting data')
    }
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
        <>
        <div>
            <h1>Dashboard</h1>
            {error && <Alert variant='danger'>{error}</Alert>}
            <p>Profile</p>
            <p>User ID: {currentUser.uid}</p>
            <p>User Email: {currentUser.email}</p>
            <div>
                <Link to='/updateprofile' className='btn btn-primary'>Update Profile</Link>
            </div>
            <Button type="submit" onClick={handleLogout}>Logout</Button>
        </div>

        </>
    )
}

