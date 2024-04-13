import React from 'react';
import { Card } from 'flowbite-react';

export const EjemploCards = () => {
    return (
        <div className='flex justify-center text-center'>
            <Card href="/hotelview" className="w-64 my-4 transition ease-in-out delay-150 hover:scale-110" style={{ height: '100px', marginTop: '-300px' }}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Morelos
                </h5>
            </Card>
            <Card href="/homeHotelero" className="w-64 ml-10 my-4 transition ease-in-out delay-150 hover:scale-110" style={{ height: '100px', marginTop: '-300px' }}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Cancún
                </h5>
            </Card>
            <Card href="/homeAdmin" className="w-64 ml-10 my-4 transition ease-in-out delay-150 hover:scale-110" style={{ height: '100px', marginTop: '-300px' }}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Card pa admin en lo que jala mi login
                </h5>
            </Card>
            <Card href="/products" className="w-64 ml-10 my-4 transition ease-in-out delay-150 hover:scale-110" style={{ height: '100px', marginTop: '-300px' }}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Oaxaca
                </h5>
            </Card>

        </div>
    );
};
