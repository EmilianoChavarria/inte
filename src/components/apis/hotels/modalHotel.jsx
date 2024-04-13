import { Button, FloatingLabel } from 'flowbite-react';
import React, { useState, useRef } from 'react';

const ModalHotel = () => {
    const formRef = useRef(null);
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
    
        if (files.length + selectedFiles.length > 3) {
            alert('No se pueden seleccionar más de 3 imágenes.');
            setSelectedFiles([]);
            return;
        }
    
        const newFiles = [];
        for (let i = 0; i < Math.min(files.length, 3 - selectedFiles.length); i++) {
            const file = files[i];
            newFiles.push(file);
        }
    
        setSelectedFiles([...selectedFiles, ...newFiles]);
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
            const response = await fetch('http://localhost:8080/api/hotel/saveHotelWithImages', {
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

        formRef.current.reset();
        setSelectedFiles([]);
    };

    return (
        <>
            <div className='w-full flex justify-between items-center px-8'>
                <p className='text-4xl'>Registrar Hotel</p>
                <Button onClick={() => setOpenModal(true)} pill>Agregar Hotel</Button>
            </div>

            <div className=" flex justify-center px-8">
                <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col gap-y-4 w-full">
                    <div className="w-full">
                        <FloatingLabel variant="standard" label="Nombre del Hotel" name="hotelName" onChange={handleInputChange} />
                    </div>
                    <div className="w-full">
                        <FloatingLabel variant="standard" label="Dirección" name="address" onChange={handleInputChange} />
                    </div>
                    <div className="w-full flex flex-row">
                        <div className='w-1/2 mr-2'>
                            <FloatingLabel variant="standard" label="Email" name="email" type="email" onChange={handleInputChange} />
                        </div>
                        <div className='w-1/2'>
                            <FloatingLabel variant="standard" label="Teléfono" name="phone" onChange={handleInputChange} />

                        </div>
                    </div>


                    <div className="w-full flex flex-row">
                        <div className='w-1/2 mr-2'>
                            <FloatingLabel variant="standard" label="Ciudad" name="city" onChange={handleInputChange} />
                        </div >
                        <div className='w-1/2'>
                            <FloatingLabel variant="standard" label="ID del Usuario" name="userId" type="number" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="w-full">
                        <FloatingLabel variant="standard" label="Descripción" name="description" onChange={handleInputChange} />
                    </div>
                    <div className=" flex flex-row">
                        <div className='w-1/2'>
                            <input type="file" accept=".jpg" multiple onChange={handleFileChange} className='w-full'/>
                        </div>
                        <div className='flex flex-row gap-x-3'>
                            {selectedFiles.map((file, index) => (
                                <img key={index} src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ maxHeight: 100, maxWidth: 100 }} />
                            ))}
                        </div>
                    </div>
                    <Button type="submit">Registrar</Button>
                </form>
            </div>
        </>
    );
}

export default ModalHotel;
