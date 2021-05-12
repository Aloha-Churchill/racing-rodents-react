import React, {useEffect, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {db} from '../firebase'
import {useHistory, Link} from 'react-router-dom'
import {Button, Alert, Dropdown, DropdownButton} from 'react-bootstrap'

const PI = 3.14159265
const RADIUS = 5

export default function LoadData() {
    const {currentUser, logout} = useAuth()
    const [userData, setUserData] = useState(0)
    const history = useHistory()
    const [error, setError] = useState('')
    const [unit, setUnit] = useState(0.01)

    useEffect(() => {
        const ref = db.ref('Users')
        ref.on('value', (snapshot) => {
            let wheel_data = snapshot.val()
            let user_data = wheel_data[currentUser.displayName]
            setUserData(user_data)
        })

        return () => ref.off();
    }, [currentUser.displayName])
    
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

    async function changeUnit(new_unit){
        setUnit(new_unit)
    }

    return (
        <div class='container rounded my-3 bg-light pt-4'>
            <h1 class='text-center'>Dashboard</h1>
            {error && <Alert variant='danger'>{error}</Alert>}

            <div>
                <DropdownButton id="dropdown-basic-button" title="Change Units">
                    <Dropdown.Item onClick={() => changeUnit(0.0000062137119224)}>Miles</Dropdown.Item>
                    <Dropdown.Item onClick={() =>changeUnit(0.00001)}>Kilometers</Dropdown.Item>
                    <Dropdown.Item onClick={() =>changeUnit(0.0328084)}>Feet</Dropdown.Item>
                    <Dropdown.Item onClick={() =>changeUnit(0.01)}>Meters</Dropdown.Item>
                </DropdownButton>
            </div>

            <table class="table table-bordered" style={{marginTop:'20px'}}>
                <thead class='thead-light'>
                    <tr>
                    <th scope="col">Daily Distance</th>
                    <th scope="col">Total Distance</th>
                    <th scope="col">Total Clockwise Distance</th>
                    <th scope="col">Total Counterclockwise Distance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">{(userData.daily_distance*PI*RADIUS/10*unit).toFixed(3)}</th>
                    <td>{(userData.total_distance*PI*RADIUS/10*unit).toFixed(3)}</td>
                    <td>{(userData.clockwise_distance*PI*RADIUS/10*unit).toFixed(3)}</td>
                    <td>{(userData.counterclockwise_distance*PI*RADIUS/10*unit).toFixed(3)}</td>
                    </tr>
                </tbody>
                </table>

            <div style={{marginBottom:'30px'}}>
                <Link to='/updateprofile' className='btn btn-primary'>Update Profile</Link>
                <Button type="submit" onClick={handleLogout} style={{marginLeft: '20px'}}>Logout</Button>
            </div>
            

            

        </div>
    )
}
