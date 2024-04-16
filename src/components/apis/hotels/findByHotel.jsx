import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { URL } from '../../../ip';

function FindByHotel() {
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        fetch(URL+`api/hotel/findOne/${hotelId}`)
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
                setHotel(data);
                localStorage.setItem('hotelName', data.data.hotelName);
            })
            .catch(error => console.error('Error fetching hotel:', error));
    }, [hotelId]);

    if (!hotel) {
        return <div>Loading...</div>;
    }

//guardar el hotelId
    localStorage.setItem('hotelId', hotel.data.hotelId);
    const images = hotel.data.images;

    return (
        <div className='m-8'>
            <div className='flex flex-col mt-8 gap-4'>
                <div className="flex justify-center items-start mb-4">
                    <img className="w-1/2 h-80 mr-4 object-cover" src={`data:image/png;base64,${images[0].image}`} alt="Imagen grande" />
                    <div className="flex flex-col items-center">
                        {images.length > 1 && (
                            <img className="w-full h-36 mb-4 object-cover" src={`data:image/png;base64,${images[1].image}`} alt="Imagen pequeña 1" />
                        )}
                        {images.length > 2 && (
                            <img className="w-full h-40 object-cover" src={`data:image/png;base64,${images[2].image}`} alt="Imagen pequeña 2" />
                        )}
                    </div>
                </div>
                <div className={`flex flex-col px-4 gap-3`}>
                    <h5 className="text-5xl font-medium tracking-tight text-gray-900 dark:text-white">
                        {hotel.data.hotelName}
                    </h5>
                    <p className="font-normal text-xl text-gray-900 dark:text-gray-400">
                        {hotel.data.description}
                    </p>
                    <p className="font-normal text-lg text-gray-700 dark:text-gray-400">
                        {hotel.data.address}, {hotel.data.city}
                    </p>
                    <Link to={`/rooms/${hotel.data.hotelId}`}>
                        <Button className='mt-4 bg-[#395886]' pill>
                            Ver Habitaciones
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FindByHotel;
