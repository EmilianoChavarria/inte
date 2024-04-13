import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Modal, Label } from 'flowbite-react';
import Swal from 'sweetalert2';

function FindByRoom() {
    const { roomId } = useParams();
    const [rooms, setRooms] = useState([]);
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const hotelName = localStorage.getItem('hotelName');
    const token = localStorage.getItem('token');
    const peopleId = localStorage.getItem('peopleId');

    const handleCheckinChange = (event) => {
        const value = event.target.value;
        const dateValue = new Date(value);
        setCheckin(dateValue.toISOString().split('T')[0]);
    };

    const handleCheckoutChange = (event) => {
        const value = event.target.value;
        const dateValue = new Date(value);
        setCheckout(dateValue.toISOString().split('T')[0]);
    };

    const saveReservation = () => {
        if (!token) {
            Swal.fire({
                title: '¿Te gustaría reservar?',
                text: 'Inicia sesión primero.',
                showCancelButton: true,
                confirmButtonText: 'Iniciar sesión',
                cancelButtonText: 'No',
                cancelButtonColor: '#dc3545',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login';
                }
            });
            return;
        }

        const reservation = {
            "reservationId": 0,
            "checkin": checkin,
            "checkout": checkout,
            "discountQuantity": 10.1,
            "discount": 0,
            "person": {
                "peopleId": peopleId
            },
            "room": {
                "roomId": rooms.roomId
            }
        };

        console.log('Reserva:', reservation)
        fetch('http://localhost:8080/api/reservation/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(reservation)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Reserva guardada exitosamente.');
                } else {
                    console.error('Error al guardar la reserva.');
                }
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
            });
    };

    useEffect(() => {
        fetch(`http://localhost:8080/api/room/findOneRoom/${roomId}`)
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
                setRooms(data.data);
            })
            .catch(error => console.error('Error fetching rooms:', error));
    }, [roomId]);

    return (
        <div className='m-8'>
            <h1>CUARTOS DEL HOTEL </h1>
            <div className='mt-8 grid grid-cols-3 gap-4'>
                <Card
                    className="max-w-sm ml-4 transition ease-in-out delay-150 hover:scale-105"
                    imgSrc="https://images.hola.com/imagenes/decoracion/20230425230358/dormitorios-inspirados-en-habitaciones-hoteles-am/1-237-28/habitaciones-hotel-5a-a.jpg"
                >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {rooms.roomName}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {rooms.description}
                    </p>
                    <div className='flex items-center'>
                        <svg className="uitk-icon uitk-field-icon" aria-hidden="true" viewBox="0 0 18 18" width="50" height="50">
                            <path fillRule="evenodd" d="M9 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 10c-1.34 0-4 .67-4 2v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1c0-1.33-2.66-2-4-2z" clipRule="evenodd"></path>
                        </svg>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {rooms.peopleQuantity} personas
                        </p>
                    </div>
                    <Button onClick={() => {
                        if (!token) {
                            Swal.fire({
                                title: '¿Te gustaría reservar?',
                                text: 'Inicia sesión primero.',
                                showCancelButton: true,
                                confirmButtonText: 'Iniciar sesión',
                                cancelButtonText: 'No',
                                cancelButtonColor: '#dc3545',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = '/login'
                                }
                            });
                            return;
                        }
                        setOpenModal(true);
                    }}>Reservar</Button>
                </Card>
                <Modal size={"2xl"} dismissible show={openModal} onClose={() => setOpenModal(false)} >
                    <Modal.Header>Reservar Hotel</Modal.Header>
                    <Modal.Body>
                        <div className='mb-4'>
                            <h1 className='text-xl font-bold'>{hotelName}</h1>
                            <h1 className='text-xl font-bold'>Habitación: {rooms.roomName}</h1>
                        </div>

                        <div className={'flex justify-around'}>
                            <div>
                                <div className='mb-2 block'>
                                    <Label htmlFor='checkin' value='Fecha de inicio' className='font-bold' />
                                </div>
                                <input type='date' id="checkin" min={new Date().toISOString().split('T')[0]} onChange={handleCheckinChange} className='rounded-xl w-56' />
                            </div>
                            <div>
                                <div className='mb-2 block'>
                                    <Label htmlFor='checkout' value='Fecha de Salida' className='font-bold' />
                                </div>
                                <input type='date' id="checkout" min={new Date().toISOString().split('T')[0]} onChange={handleCheckoutChange} className='rounded-xl w-56' />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={saveReservation}>Guardar Reserva</Button>
                        <Button outline color="failure" onClick={() => setOpenModal(false)}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default FindByRoom;
