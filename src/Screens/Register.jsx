import React from 'react'
import RegisterForm from '../components/apis/register/register-form';

function Register() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-1/2 h-full bg-gray-200">
        <img src="https://content.r9cdn.net/rimg/himg/62/c0/84/ice-85676218-68620422_3XL-430714.jpg" alt="Descripción de la imagen" className="h-full w-full object-cover" />
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="max-w-md px-4 py-8 bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default Register;