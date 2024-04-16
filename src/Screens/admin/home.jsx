import React from 'react'
import TableUsers from '../../components/apis/users/tableUsers';
import ModalHotelero from '../../components/apis/users/modal-registrar-hotelero';
import Component from './Navbar';
import SidebarComponent from './Sidebar';

const HomeAdmin = () => {
  return (
    <div className='flex'>
      <SidebarComponent />
      <div className='flex flex-col items-center '>
        <ModalHotelero />
        <TableUsers />
      </div>

    </div>
  )
}

export default HomeAdmin;
