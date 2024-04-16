import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Modal, Label } from 'flowbite-react';
import Swal from 'sweetalert2';
import image from '../../../../assets/img/wifi.png';
import image2 from '../../../../assets/img/bar.png';
import image3 from '../../../../assets/img/lavanderia.png';
import image4 from '../../../../assets/img/nadador.png';
import image5 from '../../../../assets/img/loto.png';
import image6 from '../../../../assets/img/restaurante.png';

function FindByRoom() {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const hotelName = localStorage.getItem('hotelName');
    const token = localStorage.getItem('token');
    const peopleId = localStorage.getItem('peopleId');
    const hotelId = localStorage.getItem('hotelId');

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
                "roomId": room.roomId
            },
            "hotel": {
                "hotelId": hotelId
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
                    Swal.fire({
                        icon: 'success',
                        title: '¡Reservación guardada!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log('Reserva guardada exitosamente.');
                    setOpenModal(false);

                } else {
                    response.json().then(data => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al guardar la reservación',
                            text: data.mensaje
                        });
                        console.error('Error al guardar la reserva:', data.mensaje);
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al realizar la solicitud',
                    text: error.message
                });
                console.error('Error al realizar la solicitud:', error);
            });
    };

    useEffect(() => {
        fetch(`http://localhost:8080/api/room/findOneRoom/${roomId}`)
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
                setRoom(data.data);
            })
            .catch(error => console.error('Error fetching room:', error));
    }, [roomId]);

    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div className='m-8'>
            <div className='flex flex-col mt-8 gap-4'>
                <div className="flex justify-center items-start mb-4">
                    <img className="w-1/2 h-80 mr-4 object-cover" src={`data:image/png;base64,${room.images[0].image}`} alt="Imagen grande" />
                    <div className="flex flex-col items-center">
                        {room.images.length > 1 && (
                            <img className="w-full h-36 mb-4 object-cover" src={`data:image/png;base64,${room.images[1].image}`} alt="Imagen pequeña 1" />
                        )}
                        {room.images.length > 2 && (
                            <img className="w-full h-40 object-cover" src={`data:image/png;base64,${room.images[2].image}`} alt="Imagen pequeña 2" />
                        )}
                    </div>
                </div>

                {/* seccion */}
                <div className='flex flex-row w-full'>

                    <div className={`flex flex-col px-4 gap-3 w-1/2 border-r border-gray-300 h-full`}>
                        <div className='flex items-center '>

                            <h5 className="text-5xl font-medium tracking-tight text-gray-900 dark:text-white mr-10">
                                {room.roomName}
                            </h5>
                            <Button
                                className='w-32'
                                onClick={() => {
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
                                }} pill>Reservar</Button>
                        </div>

                        <p className="font-normal text-xl text-gray-900 dark:text-gray-400">
                            {room.description}
                        </p>
                        <div className='flex items-center'>
                            <svg className="uitk-icon uitk-field-icon" aria-hidden="true" viewBox="0 0 18 18" width="50" height="50">
                                <path fillRule="evenodd" d="M9 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 10c-1.34 0-4 .67-4 2v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1c0-1.33-2.66-2-4-2z" clipRule="evenodd"></path>
                            </svg>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {room.peopleQuantity} personas
                            </p>
                        </div>

                    </div>
                    <div className='p-4 w-1/2'>
                        <h1 className='text-2xl font-bold '>Servicios de la habitación</h1>
                        <div className='flex p-2'>
                            <div className='w-1/2'>
                                <div className='flex items-center'>
                                    <img src={image} className='h-6 mr-2 mb-2'/>
                                    <h1>Wifi gratis</h1>
                                </div>
                                <div className='flex items-center'>
                                    <img src={image2} className='h-6 mr-2 mb-2'/>
                                    <h1>Bar</h1>
                                </div>
                                <div className='flex items-center'>
                                    <img src={image3} className='h-6 mr-2 mb-2'/>
                                    <h1>Lavandería</h1>
                                </div>
                                
                            </div>
                            <div className='w-1/2'>
                                <div className='flex items-center'>
                                    <img src={image4} className='h-6 mr-2 mb-2'/>
                                    <h1>Alberca</h1>
                                </div>
                                <div className='flex items-center'>
                                    <img src={image5} className='h-6 mr-2 mb-2'/>
                                    <h1>Bar</h1>
                                </div>
                                <div className='flex items-center'>
                                    <img src={image6} className='h-6 mr-2 mb-2'/>
                                    <h1>Restaurante</h1>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Modal size={"2xl"} dismissible show={openModal} onClose={() => setOpenModal(false)} >
                <Modal.Header>Reservar Habitación</Modal.Header>
                <Modal.Body>
                    <div className='mb-4'>
                        <h1 className='text-xl font-bold'>{hotelName}</h1>
                        <h1 className='text-xl font-bold'>Habitación: {room.roomName}</h1>
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
    );
}

export default FindByRoom;
