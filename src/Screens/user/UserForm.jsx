import React, { useEffect, useState } from 'react';

const UserForm = () => {
    const [userData, setUserData] = useState(null);
    const [selectedGender, setSelectedGender] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            fetch(`http://localhost:8080/api/user/findOne/${userId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Mostrar los datos en la consola
                    setUserData(data.data);
                    setSelectedGender(data.data.people.sex);
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, []);

    return (
        <div className='pl-10 pt-4 w-1/3'>
            <h1 className='text-3xl font-bold text-gray-800 mb-5'>Datos del usuario</h1>
            {userData && (
                <form className='flex flex-col'>
                    <label className='block text-lg font-medium text-gray-700' htmlFor="email">Correo electrónico:</label>
                    <input className='border border-gray-400 rounded-md p-1 m-1 ' type="text" id="email" value={userData.email} readOnly />

                    <label className='block text-lg font-medium text-gray-700' htmlFor="name">Nombre:</label>
                    <input className='border border-gray-400 rounded-md p-1 m-1 ' type="text" id="name" value={userData.people.name} readOnly />

                    <label className='block text-lg font-medium text-gray-700' htmlFor="lastname">Primer apellido:</label>
                    <input className='border border-gray-400 rounded-md p-1 m-1 ' type="text" id="lastname" value={userData.people.lastname} readOnly />

                    <label className='block text-lg font-medium text-gray-700' htmlFor="surname">Segundo apellido:</label>
                    <input className='border border-gray-400 rounded-md p-1 m-1 ' type="text" id="surname" value={userData.people.surname} readOnly />

                    <label className='block text-lg font-medium text-gray-700'>Sexo:</label>
                    <div className="flex items-center">
                        <input
                            className='border border-gray-400 rounded-md p-1 m-1'
                            type="radio"
                            id="male"
                            name="gender"
                            value="Hombre"
                            checked={selectedGender === "Hombre"}
                            readOnly
                        />
                        <label htmlFor="male" className='text-lg text-gray-700'>Hombre</label>
                        <input
                            className='border border-gray-400 rounded-md p-1 m-1'
                            type="radio"
                            id="female"
                            name="gender"
                            value="Mujer"
                            checked={selectedGender === "Mujer"}
                            readOnly
                        />
                        <label htmlFor="female" className='text-lg text-gray-700'>Mujer</label>
                    </div>

                    <label className='block text-lg font-medium text-gray-700' htmlFor="birthday">Fecha de nacimiento:</label>
                    <input className='border border-gray-400 rounded-md p-1 m-1 ' type="text" id="birthday" value={userData.people.birthday} readOnly />

                    <label className='block text-lg font-medium text-gray-700' htmlFor="curp">CURP:</label>
                    <input className='border border-gray-400 rounded-md p-1 m-1 ' type="text" id="curp" value={userData.people.curp} readOnly />
                </form>
            )}
        </div>
    );
};

export default UserForm;
