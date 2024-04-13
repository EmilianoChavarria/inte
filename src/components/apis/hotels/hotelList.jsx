import React, { useState, useEffect } from 'react';
import { Card, Button, TextInput, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";

function HotelList() {
    const [hotels, setHotels] = useState([]);
    const [search, setSearch] = useState('');
    const [searchError, setSearchError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/api/hotel/getAll')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('API response:', data);
                if (data.error) {
                    setErrorMessage(data.mensaje);
                } else {
                    setHotels(data.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching hotels:', error);
                setErrorMessage('Error cargando los hoteles');
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    let result = !search ? hotels : hotels.filter((hotel) => hotel.hotelName.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        setSearchError(result.length === 0 && search !== '');
    }, [result, search]);

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-8">
                <Spinner aria-label="Cargando hoteles" size="xl" />
            </div>
        );
    }

    if (errorMessage) {
        return <p>Error: {errorMessage}</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <div className='w-1/3'>
                <TextInput value={search} onChange={handleSearchChange} type="text" icon={CiSearch} placeholder="Busca tu hotel" required />
            </div>

            {searchError && (
                <div className='flex flex-col justify-center items-center'>
                    <p className='mt-16 text-red-500 text-2xl'>Oops! No encontramos tu hotel.</p>
                    <img src="https://cdn.dribbble.com/users/1121009/screenshots/5227139/dribbble_5.jpg" alt="" className='h-72' />
                </div>
            )}

            {result.map((hotel) => (
                <div key={hotel.hotelId} className="m-4">
                    <Card className="shadow-lg transition ease-in-out delay-150 hover:scale-105 " imgSrc={hotel.images.length > 0 ? `data:image/png;base64,${hotel.images[0].image}` : "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,f_auto,h_190,q_auto,w_240//hotelier-images/bc/24/4ba8a4f49a0f4e116088cfe3525bd427ddb55aca65b792284b03112dd011.jpeg"} style={{ maxWidth: '850px' }} horizontal>
                        <div className='flex flex-row h-72'>
                            <div className="pr-4 pt-16 border-r ">
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {hotel.hotelName}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400 w-96">
                                    {hotel.description}
                                </p>
                            </div>
                            <div className="justify-between items-center pl-6 pt-16 w-full" >
                                <div>
                                    <p className='text-gray-600/75 mb-1'>
                                        Precio por noche desde...
                                    </p>
                                    <p className='text-gray-600/100 text-xl'>
                                        MXN $4099
                                    </p>
                                </div>
                                <Link to={`/findOneHotel/${hotel.hotelId}`}>
                                    <Button className='mt-4 bg-[#395886]' pill>
                                        Ver más
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            ))}

        </div>
    );
}

export default HotelList;
