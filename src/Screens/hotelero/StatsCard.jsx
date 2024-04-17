import React, { useEffect, useState } from 'react'
import image from "../../assets/img/hotel.png";
import image1 from "../../assets/img/bed.png";
import image2 from "../../assets/img/check.png";
import image3 from "../../assets/img/cross.png";
export const StatsCard = () => {
    const [hotelData, setHotelData] = useState(null);
    const [roomData, setRoomData] = useState(null);
const token = localStorage.getItem('token');
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`http://localhost:8080/api/hotel/countByUsers/${userId}`)
                .then(response => response.json())
                .then(data => setHotelData(data))
                .catch(error => console.error('Error fetching hotel data:', error));

            fetch(`http://localhost:8080/api/room/getCountByHotel/${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => setRoomData(data))
                .catch(error => console.error('Error fetching room data:', error));
        }
    }, []);

    
    return (
        <div className="flex text-gray-800">
            <div className="p-4 w-full">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white rounded p-4 shadow-md">
                            <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                                <img src={image} alt="Hotel" className="w-7 h-7" /> {/* Aquí se muestra la imagen */}
                            </div>
                            <div className="flex flex-col flex-grow ml-4">
                                <div className="text-md text-gray-700">Tus Hoteles Registrados</div>
                                <div className="font-bold text-lg">{hotelData?.data || '-'}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white shadow-md rounded p-4">
                            <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                                <img src={image1} alt="Hotel" className="w-7 h-7" /> {/* Aquí se muestra la imagen */}
                            </div>
                            <div className="flex flex-col flex-grow ml-4">
                                <div className="text-md text-gray-700">Habitaciones Registradas</div>
                                <div className="font-bold text-lg">{roomData?.data || '-'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

