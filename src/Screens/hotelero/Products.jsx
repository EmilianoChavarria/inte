import React, { useState } from 'react';
import SidebarComponent from './Sidebar';

function ProductForm() {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const hotelId = localStorage.getItem('hotelIdP')


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            productName,
            price: parseFloat(price),
            productDescription,
            quantity: parseInt(quantity),
            hotelId: hotelId
        };
        console.log(formData)
        try {
            const response = await fetch('http://localhost:8080/api/product/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to save product');
            }

            console.log('Product saved successfully');
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };


    return (
        <div className='flex'>
            <SidebarComponent />
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre del producto:
                    <input
                    className='border-2 border-gray-300 p-2 w-full'
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Precio:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Descripción del producto:
                    <input
                        type="text"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Cantidad:
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Enviar</button>
            </form>
        </div>

    );
}

export default ProductForm;
