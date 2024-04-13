import React from 'react'
import FindByHotel from '../../components/apis/hotels/findByHotel';
import Component from '../../components/Navbar';

const FindOneHotel = () => {
    return (
        <div>
            <Component/>
            <FindByHotel />
        </div>
    )
}

export default FindOneHotel;
