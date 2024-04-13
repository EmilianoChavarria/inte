import React from 'react'
import Component from '../../components/Navbar';
import HotelList from '../../components/apis/hotels/hotelList';

function HotelViewCity() {
    return (
        <div>
            <Component />
            <HotelList />
        </div>
    )
}

export default HotelViewCity;
