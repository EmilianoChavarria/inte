import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react'; // Assuming you have an TextInput component from flowbite-react
import SidebarComponent from './Sidebar';

function EditarHotel() {
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState(null);
    const [newImages, setNewImages] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/hotel/findOne/${hotelId}`)
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
                setHotel(data);
            })
            .catch(error => console.error('Error fetching hotel:', error));
    }, [hotelId]);

    const handleImageChange = (e) => {
        setNewImages([...newImages, ...e.target.files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const hotelData = {
            id: hotelId,
            hotelName: e.target.hotelName.value,
            email: e.target.email.value,
            address: e.target.address.value,
            phone: e.target.phone.value,
            city: e.target.city.value,
            userId: userId,
            description: e.target.description.value,
            imagesId: hotel.data.images.map(image => image.id)
        };
        formData.append('id', hotelData.id);
        formData.append('hotelName', hotelData.hotelName);
        formData.append('email', hotelData.email);
        formData.append('address', hotelData.address);
        formData.append('phone', hotelData.phone);
        formData.append('city', hotelData.city);
        formData.append('userId', hotelData.userId);
        formData.append('description', hotelData.description);
        hotelData.imagesId.forEach(imageId => {
            formData.append('imagesId', imageId);
        });
        newImages.forEach(file => {
            formData.append('images', file);
        });

        formData.forEach(function (value, key) {
            console.log(key, value);
        });

        const token = localStorage.getItem('token'); // Obtener el token de localStorage

        fetch('http://localhost:8080/api/hotel/updateHotelWithImages', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}` // Incluir el token de autenticación en los headers
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('API response:', data);
                alert('Hotel actualizado correctamente');
            })
            .catch(error => {
                console.error('Error updating hotel:', error);
                alert(`Error al actualizar el hotel ${error}`);
            });
    };



    if (!hotel) {
        return <div>Loading...</div>;
    }

    const userId = localStorage.getItem('userId');
    const { hotelName, description, address, city, phone, email, images } = hotel.data;

    return (
        <div className='flex'>
            <SidebarComponent />
            <div className='flex flex-col p-8 w-full'>
                <h1 className='text-3xl font-bold'>Editar Información del Hotel</h1>
                <div className='pt-8 pl-4 w-full'>

                    <form className='flex flex-row px-4 gap-2' onSubmit={handleSubmit}>
                        <div className='w-2/5 mr-6'>
                            <Label htmlFor="hotelName" value="Nombre del Hotel" />
                            <TextInput
                                id='hotelName'
                                type="text"
                                label="Nombre del Hotel"
                                defaultValue={hotelName}
                            />
                            <Label htmlFor="description" value="Descripción" />
                            <TextInput
                                id='description'
                                type="text"
                                label="Descripción"
                                defaultValue={description}
                            />
                            <Label htmlFor="address" value="Dirección" />
                            <TextInput
                                id='address'
                                type="text"
                                label="Dirección"
                                defaultValue={address}
                            />
                            <Label htmlFor="city" value="Ciudad" />
                            <TextInput
                                id='city'
                                type="text"
                                label="Ciudad"
                                defaultValue={city}
                            />
                            <Label htmlFor="email" value="Correo Electrónico" />
                            <TextInput
                                id='email'
                                type="text"
                                label="Correo Electrónico"
                                defaultValue={email}
                            />
                            <Label htmlFor="phone" value="Teléfono" />
                            <TextInput
                                id='phone'
                                type="text"
                                label="Teléfono"
                                defaultValue={phone}
                            />
                            <Button type="submit">Guardar Cambios</Button>
                        </div>
                        <div className='grid grid-cols-2 w-1/2'>
                            <Label htmlFor="newImages" value="Nuevas Imágenes" />
                            <input id='newImages' type="file" multiple onChange={handleImageChange} />
                            <img className="w-full h-40 object-cover" src={`data:image/png;base64,${images[0].image}`} alt="Imagen grande" />
                            <div className="flex flex-col items-center ml-6">
                                {images.length > 1 && (
                                    <img className="w-full h-40 mb-4 object-cover" src={`data:image/png;base64,${images[1].image}`} alt="Imagen pequeña 1" />
                                )}
                                {images.length > 2 && (
                                    <img className="w-full h-40 object-cover" src={`data:image/png;base64,${images[2].image}`} alt="Imagen pequeña 2" />
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    );


}

export default EditarHotel;
