import React from 'react'
import Component from '../../../components/Navbar';
import FindByRoom from '../../../components/apis/hotels/rooms/findByRoom';

const FindOneRoom = () => {
  return (
    <div>
        <Component/>
        <FindByRoom/>  
    </div>
  )
}

export default FindOneRoom;
