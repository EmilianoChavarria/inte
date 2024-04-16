import React, { useState } from 'react';
import { URL } from '../../../ip';

function FileUploadComponent() {
  const [imageSrcs, setImageSrcs] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [additionalData, setAdditionalData] = useState({
    hotelName: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    userId: 0,
    description: ''
  });

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFiles = [];
    const newUrls = [];
  
    for (let i = 0; i < Math.min(files.length, 3); i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      newFiles.push(file);
      newUrls.push(url);
    }
  
    setSelectedFiles([...selectedFiles, ...newFiles]);
    setImageSrcs([...imageSrcs, ...newUrls]);
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdditionalData({ ...additionalData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFiles.length === 0) {
      console.log('No se ha seleccionado ningún archivo.');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });
    

    formData.append('hotelName', additionalData.hotelName);
    formData.append('email', additionalData.email);
    formData.append('address', additionalData.address);
    formData.append('phone', additionalData.phone);
    formData.append('city', additionalData.city);
    formData.append('userId', additionalData.userId);
    formData.append('description', additionalData.description);

    try {
      const response = await fetch(URL+'api/hotel/saveHotelWithImages', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Imagen y datos adicionales enviados con éxito.');
      } else {
        console.error('Error al enviar la imagen y datos adicionales:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar la imagen y datos adicionales:', error);
    }
  };

  return (
    <div>
      <h2>Enviar Imagen</h2>
      <form onSubmit={handleSubmit} className='flex flex-col w-96'>
        <input type="file" accept=".jpg" multiple onChange={handleFileChange} />
        {imageSrcs.map((src, index) => (
          <img key={index} src={src} alt={`Preview ${index}`} style={{  maxHeight: 100, maxWidth: 100 }} />
        ))}
        {/* Campos de entrada para datos adicionales */}
        <input
          type="text"
          name="hotelName"
          placeholder="nombre del hotel"
          value={additionalData.hotelName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          value={additionalData.email}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="address"
          placeholder="address"
          value={additionalData.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="phone"
          value={additionalData.phone}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="city"
          placeholder="city"
          value={additionalData.city}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name="userId"
          placeholder="userId"
          value={additionalData.userId}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="description"
          placeholder="description"
          value={additionalData.description}
          onChange={handleInputChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default FileUploadComponent;
