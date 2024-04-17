import React from 'react'
import SidebarComponent from './Sidebar'
import Hoteles from './TableHoteles'

const HomeRecepcionista = () => {
  return (
    <div className='flex'>
        <SidebarComponent />
       <Hoteles /> 
    </div>
  )
}

export default HomeRecepcionista