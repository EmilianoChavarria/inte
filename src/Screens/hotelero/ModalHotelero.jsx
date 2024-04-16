import React, { useState, useRef } from 'react';
import { Button, Modal, FloatingLabel, Label, Radio, TextInput } from 'flowbite-react';
import Swal from 'sweetalert2';
import { GrUserAdd } from "react-icons/gr";


const ModalHotelero = ({ hotelId }) => {
    const [openModal, setOpenModal] = useState(false);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rol: {
            rolName: 'RECEPTIONIST_ROLE'
        },
        people: {
            name: '',
            lastname: '',
            surname: '',
            birthday: '',
            curp: '',
            sex: ''
        },
        hotel: [
            //aqui va el hotelId que se manda de la otra secreen
            { hotelId: hotelId }
        ]
    });
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email' || name === 'password') {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                people: {
                    ...prevState.people,
                    [name]: value
                }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAttemptedSubmit(true);

        try {
            const response = await fetch('http://localhost:8080/api/user/saveReceptionist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Registro exitoso');
                Swal.fire('¡Registro exitoso!', 'El usuario ha sido registrado correctamente.', 'success');
                setOpenModal(false);
                // window.location.reload();
            } else {
                console.log(formData);

                const errorData = await response.json();
                console.error('Error al registrar:', errorData);
                alert(`Error al registrar: ${errorData.mensaje}`);
            }
        } catch (error) {
            console.error('Error de red:', error);
            console.log(formData);

            alert('Error de red, por favor, intenta de nuevo.');
        }
    };

    const isFieldValid = (fieldName) => {
        if (fieldName === 'email' || fieldName === 'password') {
            return formData[fieldName] !== '' || !attemptedSubmit;
        } else {
            return formData.people[fieldName] !== '' || !attemptedSubmit;
        }
    };

    return (
        <>
            <div >
                <Button color="warning" onClick={() => setOpenModal(true)} size="xs" outline pill>
                    <GrUserAdd className="h-6 w-6" />
                </Button>
            </div>

            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Registrar Hotelero</Modal.Header>
                <Modal.Body>
                    <form className="flex w-auto flex-col gap-1" onSubmit={handleSubmit}>

                        {/* nombre */}
                        <div>
                            <div className={`mb-2 block ${!isFieldValid('name') && 'text-red-500'}`}>
                                <Label htmlFor="name" value="Nombre" />
                            </div>
                            <TextInput id="name" type="text" placeholder="Nombre" onChange={handleChange} name="name" color={!isFieldValid('name') ? 'failure' : ''} />
                        </div>
                        {/* apellidos */}
                        <div className='flex flex-row'>
                            <div className='mr-4'>
                                <div className={`mb-2 block ${!isFieldValid('lastname') && 'text-red-500'}`}>
                                    <Label htmlFor="lastname" value="Primer Apellido" />
                                </div>
                                <TextInput id="lastname" type="text" placeholder="Primer Apellido" onChange={handleChange} name="lastname" color={!isFieldValid('lastname') ? 'failure' : ''} />
                            </div>
                            <div>
                                <div className={`mb-2 block ${!isFieldValid('surname') && 'text-red-500'}`}>
                                    <Label htmlFor="surname" value="Segundo Apellido" />
                                </div>
                                <TextInput id="surname" type="text" placeholder="Segundo Apellido" onChange={handleChange} name="surname" color={!isFieldValid('surname') ? 'failure' : ''} />
                            </div>
                        </div>

                        <div>
                            <div className={`mb-2 block ${!isFieldValid('curp') && 'text-red-500'}`}>
                                <Label htmlFor="curp" value="CURP" />
                            </div>
                            <TextInput id="curp" type="text" placeholder="CURP" onChange={handleChange} name="curp" color={!isFieldValid('curp') ? 'failure' : ''} />
                        </div>

                        {/* email y password */}
                        <div className='flex flex-row'>
                            <div className='mr-4'>
                                <div className={`mb-2 block ${!isFieldValid('email') && 'text-red-500'}`}>
                                    <Label htmlFor="email" value="Correo" />
                                </div>
                                <TextInput id="email" type="email" placeholder="name@flowbite.com" onChange={handleChange} name="email" color={!isFieldValid('email') ? 'failure' : ''} />
                            </div>
                            <div>
                                <div className={`mb-2 block ${!isFieldValid('password') && 'text-red-500'}`}>
                                    <Label htmlFor="password" value="Contraseña" />
                                </div>
                                <TextInput id="password" type="password" placeholder="Contraseña" onChange={handleChange} name="password" color={!isFieldValid('password') ? 'failure' : ''} />
                            </div>
                        </div>
                        <fieldset className="flex max-w-md flex-row gap-4">
                            <legend className="mb-4 text-blue-600/75">Sexo:</legend>
                            <div className="flex items-center gap-2">
                                <Radio id="hombre" name="sex" value="Hombre" onChange={handleChange} />
                                <Label htmlFor="hombre">Hombre</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio id="mujer" name="sex" value="Mujer" onChange={handleChange} />
                                <Label htmlFor="mujer">Mujer</Label>
                            </div>
                        </fieldset>
                        <div className={`mb-2 block ${!isFieldValid('birthday') && 'text-red-500'}`}>
                            <Label htmlFor="birthday" value="Fecha de nacimiento" />
                        </div>
                        <TextInput className='mb-4' id="birthday" type="date" onChange={handleChange} name="birthday" color={!isFieldValid('birthday') ? 'failure' : ''} />

                    </form>
                </Modal.Body>
                <Modal.Footer className='justify-end'>
                    <button onClick={handleSubmit} className="btn btn-primary">Registrar</button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalHotelero;
