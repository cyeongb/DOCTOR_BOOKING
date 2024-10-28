import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div>
        {/* ----------- left */}
        <div>
            <p>
                Book Appointment <br /> With Trusted Doctors
            </p>
            <div>
                <img src={assets.profile_img} alt=''/>
                <p>Simply browse through our extensive list of trusted doctors,<br/>schedule your appointment hassle-free.
                </p>
            </div>
            <a href=''>Book Appointment <img src={assets.}/> </a>
        </div>

        {/* ------------- right */}

        <div>

        </div>
    </div>
  )
}

export default Header