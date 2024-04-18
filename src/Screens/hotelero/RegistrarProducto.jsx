import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export function ComponentProduct() {
    const [openModal, setOpenModal] = useState(false);
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
        setOpenModal(false);
        //   actualizar la página
        window.location.reload();

    };


    return (
        <>
            <Button onClick={() => setOpenModal(true)} color="blue" pill>Registrar Producto</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Registrar Producto</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} >
                        <label className="flex flex-col">
                            Nombre del producto:
                            <input
                                className='border-2 rounded-lg border-gray-300 p-2 w-1/2'
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </label>
                        <br />
                        <label className="flex flex-col">
                            Precio:
                            <input
                                className='border-2 rounded-lg border-gray-300 p-2 w-1/2'
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                        <br />
                        <label className="flex flex-col">
                            Descripción del producto:
                            <input
                                                className='border-2 rounded-lg border-gray-300 p-2 w-1/2'

                                type="text"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            />
                        </label >
                        <br />
                        <label className="flex flex-col">
                            Cantidad:
                            <input
                                                className='border-2 rounded-lg border-gray-300 p-2 w-1/2'

                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </label>
                        <br />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleSubmit} className="btn btn-primary">Registrar</button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
