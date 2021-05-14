import React from 'react'
import imageone from '../images/IMG-2312.jpg'
import imagetwo from '../images/IMG-2313.jpg'
import imagethree from '../images/IMG-2314.jpg'

export default function Welcome() {
    return (
        <div class='container rounded my-3 bg-light pt-4'>
            <h1 class='text-center' style={{padding:'10px'}}>Welcome to Racing Rodents!</h1>
            <hr></hr>
            <h3>The SmartWheel</h3>
            <p>The smart wheel is designed to track your pet's distance while using their wheel.
                When you purchase a SmartWheel, simply create an account with using your device number and 
                preferred email address. Connect your device to WiFi, and then go to the dashboard to view your
                pet's distance in real time! 
            </p>
            <p>*Note: This product is still under development.</p>
            <div class="card-group">
                <div class="card">
                    <img src={imageone} alt="smartwheel" class = 'img-thumbnail'/>
                </div>
                <div class="card">
                    <img src={imagetwo} alt="smartwheel" class = 'img-thumbnail'/>
                </div>
                <div class="card">
                    <img src={imagethree} alt="smartwheel" class = 'img-thumbnail'/>
                </div>
            </div>

            
            
            
        </div>
    )
}

