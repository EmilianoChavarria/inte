import React from 'react'
import Component from '../../components/Navbar'
import SidebarComponent from './Sidebar'
import UserData from './UserForm'

const Profile = () => {
    return (
        <>
            <Component />
            <div className='flex'>
                
                <SidebarComponent />
                <UserData/>
            </div>
        </>

    )
}

export default Profile