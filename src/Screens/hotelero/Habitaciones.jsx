import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Spinner, Sidebar } from 'flowbite-react';
import SidebarComponent from './Sidebar';
import Carousel from 'react-multi-carousel';

function Habitaciones() {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };
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
        <div className='flex'>
            <SidebarComponent />
            <div className='p-10 ' style={{ maxWidth: '1000px', margin: '0' }}>
                <div className='w-full flex justify-between mb-2'>
                    <h1 className='text-3xl font-bold mb-4'>Habitaciones del hotel</h1>
                    <Link to={`/registrarHabitacion/${hotelId}`}>
                        <Button pill>Registrar Habitación</Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <Spinner aria-label="Cargando habitaciones" size="xl" />
                    </div>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <Carousel
                        swipeable={true}
                        showDots={true}
                        responsive={responsive}
                        infinite={true}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        deviceType={"desktop"}
                        dotListClass="custom-dot-list-style"

                    >
                        {rooms.map(room => (
                            <div key={room.roomId}  >
                                <div className="rounded-lg bg-white shadow-md mb-10 " style={{ width: 300 }}>
                                    <a href="#!">
                                        <img className="rounded-t-lg h-48 w-full object-cover object-center"
                                            src={'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,f_auto,h_190,q_auto,w_240//hotelier-images/bc/24/4ba8a4f49a0f4e116088cfe3525bd427ddb55aca65b792284b03112dd011.jpeg'}
                                            alt="" />
                                    </a>
                                    <div className="p-6 text-surface dark:text-white">
                                        <h5 className="mb-2 text-xl font-medium leading-tight">{room.roomName}</h5>
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
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                )}
            </div>
        </div >

    );
}

export default Habitaciones;
