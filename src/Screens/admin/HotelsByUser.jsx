import React from 'react'
import Hoteles from './Hotels'
import SidebarComponent from './Sidebar'

const HotelsByUser = () => {
    return (
        <div className="flex">
            <SidebarComponent />
            <div className="flex flex-col ">
                <div className='pl-8 pt-10'>
                    <h1 className='text-3xl font-bold mb-2'>Hoteles por usuario</h1>
                    <Hoteles />
                </div>
            </div>
        </div>
    )
}

export default HotelsByUser