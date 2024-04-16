import React from 'react';
import Component from '../../components/Navbar';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import SidebarComponent from './Sidebar';
import { StatsCard } from './StatsCard';
import Hoteles from './Hotels';

export const HomeHotelero = () => {
    return (
        <div className="flex">
            <SidebarComponent />
            <div className="flex flex-col">
                <StatsCard />
                <div className='pr-8, pl-8'>
                    <h1 className='text-3xl font-bold mb-2'>Mis hoteles</h1>
                    <Hoteles />

                </div>
            </div>
        </div>
    );
};
