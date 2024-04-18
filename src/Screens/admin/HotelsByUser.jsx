import React from 'react'
import Hoteles from './Hotels'
import SidebarComponent from './Sidebar'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

const HotelsByUser = () => {
    return (
        <div className="flex">
            <SidebarComponent />
            <div className="flex flex-col ">
                <div className='pl-8 pt-10'>
                    <div className='flex flex-row'>
                        <h1 className='text-3xl font-bold mb-2'>Hoteles por usuario</h1>
                        <Link to='/registrarHotel' className='ml-4'>
                        <Button>Registrar Hotel</Button>
                        </Link>
                    </div>
                    <Hoteles />
                </div>
            </div>
        </div>
    )
}

export default HotelsByUser