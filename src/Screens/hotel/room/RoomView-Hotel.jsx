import React from 'react';
import Component from '../../../components/Navbar';
import RoomList from '../../../components/apis/hotels/rooms/roomList';

function RoomViewHotel() {
    return (
        <>
            <Component />
            <RoomList />
        </>
    );
}

export default RoomViewHotel;
