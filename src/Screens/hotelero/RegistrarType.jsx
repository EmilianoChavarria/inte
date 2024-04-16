import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

const RoomTypeForm = () => {
    const [typeName, setTypeName] = useState('');
    const [price, setPrice] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);

    const handleTypeNameChange = (event) => {
        setTypeName(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const token = localStorage.getItem('token');
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                const response = await fetch('http://localhost:8080/api/roomType/getAll', requestOptions);
                if (response.ok) {
                    const data = await response.json();
                    setRoomTypes(data.data); // Asignamos solo el array de tipos de habitaciones
                } else {
                    console.error('Failed to fetch room types.');
                }
            } catch (error) {
                console.error('Error fetching room types:', error);
            }
        };

        fetchRoomTypes();
    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!typeName.trim()) {
            console.error('El campo "Tipo de habitación" no puede estar vacío.');
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ typeName, price }),
        };

        try {
            const response = await fetch('http://localhost:8080/api/roomType/save', requestOptions);
            if (response.ok) {
                console.log('Room type saved successfully!');
                window.location.reload();
            } else {
                console.error('Failed to save room type.');
            }
        } catch (error) {
            console.error('Error saving room type:', error);
        }
    };


    return (
        <div className='flex border border-gray-400 rounded-md p-4 m-4 '>
            <form onSubmit={handleSubmit} className='flex flex-col w-2/3 border-r  border-gray-200'>
                <div className='flex'>
                    <label className='flex flex-col'>
                        Tipo de habitación:
                        <input
                            type="text"
                            value={typeName}
                            onChange={handleTypeNameChange}
                            className='border border-gray-400 rounded-md p-1 m-1 '
                        />
                    </label>
                    <label className='flex flex-col'>
                        Precio:
                        <input
                            type="number"
                            value={price}
                            onChange={handlePriceChange}
                            className='border border-gray-400 rounded-md p-1 m-1 '
                        />
                    </label>
                </div>

                <div className='flex justify-center'>
                    <Button type="submit" className='w-32'>Guardar</Button>

                </div>
            </form>
            <div className='flex flex-col justify-center px-2'>
                <h1 className='text-xl font-semibold'>Tipos de habitación disponibles</h1>
                <div className='px-4'>
                    {roomTypes.map(roomType => (
                        <div key={roomType.roomTypeId}>
                            <h3>• {roomType.typeName} ${roomType.price}</h3>

                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default RoomTypeForm;
