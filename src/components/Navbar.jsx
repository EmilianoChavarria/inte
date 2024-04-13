import React from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';


function Component() {

 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('lastname');
    localStorage.removeItem('surname');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('peopleId');
    localStorage.removeItem('hotelName');
    window.location.href = '/';
  };

  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const lastname = localStorage.getItem('lastname');
  const surname = localStorage.getItem('surname');
  const email = localStorage.getItem('email');
  const showLogoutButton = token !== null; // Verificar si hay un token almacenado

  return (
    <Navbar fluid rounded className='shadow-md'>
      <Navbar.Brand href="/">
        <img src="https://cdn-icons-png.flaticon.com/512/3009/3009710.png" className="mr-3 h-6 sm:h-9" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">HOTEL AMETO</span>
      </Navbar.Brand>
      <div className="flex md:order-2">

      {showLogoutButton && <span className="hidden md:flex md:items-center md:mr-4 md:text-lg md:font-semibold"> Hola {name} </span>}
        <Dropdown
          arrowIcon={true}
          inline
          label={
            <Avatar alt="User settings" img="https://i.ibb.co/NsBjwWd/istockphoto-1131164548-612x612.jpg" rounded />
            
          }
        >
          {showLogoutButton &&<Dropdown.Header>
            <span className="block text-base">{name} {lastname} {surname}</span>
            <span className="block truncate text-sm font-medium">{email}</span>
          </Dropdown.Header>}
          {showLogoutButton &&<Dropdown.Item>Pagos</Dropdown.Item>}
          {showLogoutButton &&<Dropdown.Item>Reservaciones</Dropdown.Item>}
          {showLogoutButton &&<Dropdown.Divider />}
          {showLogoutButton && <Dropdown.Item onClick={handleLogout} className='text-red-700'>Cerrar Sesión</Dropdown.Item>}
          {!showLogoutButton && <Link to="/login"><Dropdown.Item className='text-blue-800'>Iniciar Sesión</Dropdown.Item></Link>}
        </Dropdown>
        <Navbar />
      </div>
      {/* <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}

export default Component;
