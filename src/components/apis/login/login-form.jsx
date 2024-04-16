import React, { useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdOutlinePassword } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Swal from 'sweetalert2';


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const navigate = useNavigate(); 

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const cambiarShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAttemptedSubmit(true);
        const data = {
            username: email,
            password: password
        };
    
        fetch('http://localhost:8080/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.mensaje || 'Ha ocurrido un error',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    const token = result.data.token;
    
                    localStorage.setItem('token', token);
                    console.log(`Token guardado en localStorage: ${localStorage.getItem('token')}`);
    
                    const user = result.data.user;
                    localStorage.setItem('name', user.people.name);
                    localStorage.setItem('lastname', user.people.lastname);
                    localStorage.setItem('surname', user.people.surname);
                    localStorage.setItem('peopleId', user.people.peopleId);
                    localStorage.setItem('userId', user.userId);
                    localStorage.setItem('email', user.email);
    
                    console.log(`Nombre guardado en localStorage: ${localStorage.getItem('name')}`);
                    console.log(`Apellidos guardados en localStorage: ${localStorage.getItem('lastname')}`);
                    console.log(`UserId guardado en localStorage: ${localStorage.getItem('userId')}`);
    
                    const userRole = JSON.parse(atob(token.split('.')[1])).roles[0].authority;
                    console.log(`UserRole: ${userRole}`);
    
                    let redirectPath = '/';
                    switch (userRole) {
                        case 'ADMIN_ROLE':
                            redirectPath = '/homeAdmin';
                            break;
                        case 'HOTELERO_ROLE':
                            redirectPath = '/homeHotelero';
                            break;
                        case 'USER_ROLE':
                            redirectPath = '/';
                            break;
                        default:
                            redirectPath = '/';
                            break;
                    }
    
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Inicio de sesión exitoso',
                        text: '¡Bienvenido!',
                        showConfirmButton: false,
                        timer: 1300 
                    });
    
                    
                    setTimeout(() => {
                        navigate(redirectPath); 
                    },1300); 
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    
    



    const emailValid = email.trim() !== '';
    const passwordValid = password.trim() !== '';

    return (
        <form className="flex max-w-max flex-col gap-6">
            <div className="flex items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/3009/3009710.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
                <div className='text-2xl text-blue-600/100 font-bold'>HOTEL AMETO</div>
            </div>
            <div className="max-w-md">
                <div className={`mb-2 block ${(!emailValid && attemptedSubmit) ? 'text-red-500' : ''}`}>
                    <Label htmlFor="email4" value="Correo" />
                </div>
                <TextInput id="email4" type="email" icon={HiMail} placeholder="Email" onChange={handleEmailChange} value={email} required color={!emailValid && attemptedSubmit ? 'failure' : ''} />
            </div>
            <div className="max-w-md">
                <div className={`mb-2 block ${(!passwordValid && attemptedSubmit) ? 'text-red-500' : ''}`}>
                    <Label htmlFor="password" value="Contraseña" />
                </div>
                <div className="relative">
                    <TextInput id="password" type={showPassword ? 'text' : 'password'} icon={MdOutlinePassword} placeholder="Contraseña" onChange={handlePasswordChange} value={password} required color={!passwordValid && attemptedSubmit ? 'failure' : ''} />
                    <button type="button" onClick={cambiarShowPassword} className="absolute inset-y-0 right-0 px-3 py-2">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            <Button href='/' type="submit" onClick={handleSubmit}>Iniciar Sesión</Button>
            <div className='text-sm'>¿No tienes cuenta? <a href="/register" className='text-blue-600/100'>Regístrate</a></div>
        </form>
    );
}

export default LoginForm;
