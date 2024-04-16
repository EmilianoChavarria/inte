import { Label, Radio, Button, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom'

function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rol: {
            rolName: 'USER_ROLE'
        },
        people: {
            name: '',
            lastname: '',
            surname: '',
            birthday: '',
            curp: '',
            sex: ''
        }
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
            const response = await fetch('http://localhost:8080/api/user/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const responseData = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: responseData.message
                }).then(() => {
                    navigate('/login')
                });
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error al registrar',
                    text: errorData.message
                });
            }
        } catch (error) {
            console.error('Error de red:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de red',
                text: 'Error de red, por favor, intenta de nuevo.'
            });
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
        <form className="flex w-auto flex-col gap-1" onSubmit={handleSubmit}>
            <div className="flex justify-center items-center mb-4">
                <img src="https://cdn-icons-png.flaticon.com/512/3009/3009710.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
                <div className='text-2xl text-blue-600/100 font-bold'>HOTEL AMETO</div>
            </div>

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

            <Button type="submit" className='mb-4'>Registrar</Button>
            <div className='text-sm text-center'>¿Ya tienes una cuenta? <Link to="/login" className='text-blue-600/100'>Iniciar Sesión</Link></div>
        </form>
    );
}

export default RegisterForm;
