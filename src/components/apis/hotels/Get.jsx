import React, { useState } from 'react';

const Get = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = () => {
    fetch('http://localhost:8080/api/hotel/')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de hoteles');
        }
        return response.json();
      })
      .then(data => {
        setHotels(data.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de hoteles:', error);
      });
  };

  const handleRemoveImage = (hotelId, imageIndex) => {
    const updatedHotels = hotels.map(hotel => {
      if (hotel.hotelId === hotelId) {
        const updatedImages = hotel.images.filter((image, index) => index !== imageIndex);
        return { ...hotel, images: updatedImages };
      }
      return hotel;
    });
    setHotels(updatedHotels);
  };

  return (
    <div>
      <button onClick={fetchHotels}>Obtener hoteles</button>
      <ul>
        {hotels.map(hotel => (
          <li key={hotel.hotelId}>
            <h2>{hotel.hotelName}</h2>
            <p>{hotel.address}</p>
            <p>{hotel.email}</p>
            <p>{hotel.phone}</p>
            <p>{hotel.city}</p>
            <p>{hotel.description}</p>
            {hotel.images.map((image, index) => (
              <div key={index}>
                <img
                  src={`data:image/png;base64,${image.image}`}
                  alt="Imagen"
                  style={{ height: 100, width: 100 }}
                />
                <button onClick={() => handleRemoveImage(hotel.hotelId, index)}>Eliminar</button>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Get;
