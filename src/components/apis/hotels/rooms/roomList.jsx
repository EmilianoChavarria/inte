import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Spinner } from 'flowbite-react';
import { URL } from '../../../../ip';

function RoomList() {
    const { hotelId } = useParams();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch(URL+`api/room/getByHotel/${hotelId}`)
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
                if (data.error) {
                    setErrorMessage(data.mensaje);
                } else {
                    setRooms(data.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching rooms:', error);
                setLoading(false);
            });
    }, [hotelId]);

    return (
        <div className='mr-8 ml-8 mt-4'>
            <h1 className='text-lg'>CUARTOS DEL HOTEL</h1>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Spinner aria-label="Cargando habitaciones" size="xl" />
                </div>
            ) : errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                <div className='mt-4 grid grid-cols-3 gap-4'>
                    {rooms.map(room => (
                        <div key={room.roomId}  >
                            <div className="rounded-lg bg-white shadow-md mb-10 " style={{ width: 400 }}>
                                <a href="#!">
                                    <img className="rounded-t-lg h-56 w-full object-cover object-center"
                                        src={room.images.length > 0 ? `data:image/png;base64,${room.images[0].image}` : 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,f_auto,h_190,q_auto,w_240//hotelier-images/bc/24/4ba8a4f49a0f4e116088cfe3525bd427ddb55aca65b792284b03112dd011.jpeg'}
                                        alt="" />
                                </a>
                                <div className="p-6 text-surface dark:text-white">
                                    <div className='flex justify-between pr-10'>
                                        <h5 className="mb-2 text-xl font-medium leading-tight">{room.roomName}</h5>
                                        <span
                                            class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden
                                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                            <span class="relative">{room.type.typeName}</span>
                                        </span>                                   </div>
                                    <p className="mb-4 text-base h-16">{room.description}</p>
                                    <p className="mb-4 text-base">{room.address}</p>
                                    <div className='flex items-center'>
                                        <svg className="uitk-icon uitk-field-icon" aria-hidden="true" viewBox="0 0 18 18" width="50" height="50">
                                            <path fillRule="evenodd" d="M9 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 10c-1.34 0-4 .67-4 2v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1c0-1.33-2.66-2-4-2z" clipRule="evenodd"></path>
                                        </svg>
                                        <p className="font-normal text-gray-700 dark:text-gray-400">
                                            {room.peopleQuantity} personas
                                        </p>
                                    </div>
                                    <div className='flex flex-col w-full border-t border-gray-200 mb-2'>
                                        <h1>Precio por noche desde...</h1>
                                        <h1 className='text-center text-3xl text-blue-800'>MXN${room.type.price}</h1>
                                    </div>
                                    <Link to={`/findOneRoom/${room.roomId}`} className='w-full'>
                                        <Button className='w-full'>Ver Habitación</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RoomList;
