import React from 'react'
import TableUsers from '../../components/apis/users/tableUsers';
import ModalHotelero from '../../components/apis/users/modal-registrar-hotelero';
import Component from '../../components/Navbar';

const HomeAdmin = () => {
  return (
    <div>
      <Component/>
      <ModalHotelero />
      <TableUsers />
    </div>
  )
}

export default HomeAdmin;
