import { Button, Modal, FloatingLabel } from 'flowbite-react';
import { useState, useRef } from 'react';

const RegisterModal = () => {
    const [openModal, setOpenModal] = useState(false);
    const formRef = useRef(null);

    const guardar = async () => {
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            try {
                const response = await fetch('http://localhost:8080/api/product/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    console.log('Producto registrado exitosamente');
                } else {
                    console.error('Error al registrar el producto');
                }
            } catch (error) {
                console.error(error);
            }
        }
        setOpenModal(false);
        window.location.reload();
    };

    return (
        <>
            <div className='w-full flex justify-between items-center'>
                <p className='text-4xl'>Inventario</p>
                <Button onClick={() => setOpenModal(true)} pill>Agregar Producto</Button>
            </div>

            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Registrar Productos</Modal.Header>
                <Modal.Body>
                    <div className="flex justify-center">
                        <form ref={formRef} className="flex items-start flex-col gap-6">
                            <div className="w-full md:w-96">
                                <FloatingLabel variant="standard" label="Nombre" name="productName" />
                            </div>
                            <div className="w-full">
                                <FloatingLabel variant="standard" label="Descripción del Producto" name="productDescription" />
                            </div>
                            <div className="flex flex-row justify-between items-center w-full md:w-96">
                                <div className="w-1/2 mr-6">
                                    <FloatingLabel variant="standard" label="Precio" name="price" type="number" />
                                </div>
                                <div className="w-1/2">
                                    <FloatingLabel variant="standard" label="Cantidad" name="quantity" type="number" />
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-end'>
                    <Button onClick={guardar}>Registrar</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RegisterModal;
