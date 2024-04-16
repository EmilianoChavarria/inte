import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Navbar, Modal, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import { URL } from '../../ip';

function Component() {
  const [openModal, setOpenModal] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (openModal) {
      fetch(URL+'api/reservation/getByPerson/3')
        .then(response => response.json())
        .then(data => {
          if (data.status === 'OK') {
            setReservations(data.data);
          }
        })
        .catch(error => console.error('Error fetching reservations:', error));
    }
  }, [openModal]);

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('lastname');
        localStorage.removeItem('surname');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('peopleId');
        localStorage.removeItem('hotelName');
        localStorage.removeItem('hotelId');
        window.location.href = '/';
      }
    });
  };

  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const lastname = localStorage.getItem('lastname');
  const surname = localStorage.getItem('surname');
  const email = localStorage.getItem('email');

  const showLogoutButton = token !== null; // Verificar si hay un token almacenado

  return (
    <Navbar fluid rounded className='shadow-md'>
      <Navbar.Brand href="/homeAdmin">
        <img src="https://cdn-icons-png.flaticon.com/512/3009/3009710.png" className="mr-3 h-6 sm:h-9" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">HOTEL AMETO</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {showLogoutButton && <span className="hidden md:flex md:items-center md:mr-4 md:text-lg md:font-semibold"> Hola {name} </span>}
        <Dropdown
          arrowIcon={true}
          inline
          label={<Avatar alt="User settings" img="https://i.ibb.co/NsBjwWd/istockphoto-1131164548-612x612.jpg" rounded />}
        >
          {showLogoutButton && <Dropdown.Header>
            <span className="block text-base">{name} {lastname} {surname}</span>
            <span className="block truncate text-sm font-medium">{email}</span>
          </Dropdown.Header>}
          {showLogoutButton && <Link to="/profile"><Dropdown.Item>Profile</Dropdown.Item></Link>}
          {showLogoutButton && <Dropdown.Item onClick={() => setOpenModal(true)}>Mis Reservaciones</Dropdown.Item>}
          {showLogoutButton && <Dropdown.Divider />}
          {showLogoutButton && <Dropdown.Item onClick={handleLogout} className='text-red-700'>Cerrar Sesión</Dropdown.Item>}
          {!showLogoutButton && <Link to="/login"><Dropdown.Item className='text-blue-800'>Iniciar Sesión</Dropdown.Item></Link>}
        </Dropdown>
        <Navbar />
        <Modal size={"6xl"} show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Reservaciones</Modal.Header>
          <Modal.Body>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-Out</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map(reservation => (
                  <tr key={reservation.reservationId}>
                    <td className="px-6 py-4 whitespace-nowrap">{reservation.checkin}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{reservation.checkout}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal(false)}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Navbar>
  );
}

export default Component;
