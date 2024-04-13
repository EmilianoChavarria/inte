import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Spinner } from 'flowbite-react';

function RoomList() {
    const { hotelId } = useParams();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/api/room/getByHotel/${hotelId}`)
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
        <div className='m-8'>
            <h1>CUARTOS DEL HOTEL</h1>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                <Spinner aria-label="Cargando habitaciones" size="xl" />
            </div>
            ) : errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                <div className='mt-8 grid grid-cols-3 gap-4'>
                    {rooms.map(room => (
                        <div key={room.roomId}>
                            <Card
                                className="max-w-sm ml-4 transition ease-in-out delay-150 hover:scale-105"
                                imgSrc="https://images.hola.com/imagenes/decoracion/20230425230358/dormitorios-inspirados-en-habitaciones-hoteles-am/1-237-28/habitaciones-hotel-5a-a.jpg"
                            >
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {room.roomName}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
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

                                <Link to={`/findOneRoom/${room.roomId}`}>
                                    <Button className='mt-4 bg-[#395886]' pill>
                                        Ver Habitación
                                    </Button>
                                </Link>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RoomList;
