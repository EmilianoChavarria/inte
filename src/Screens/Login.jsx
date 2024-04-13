import React from 'react';
import LoginForm from '../components/apis/login/login-form';

function Login() {
  return (
    <div className="relative flex flex-col lg:flex-row h-screen">
      <div className="lg:w-1/2">
        <img
          src="https://content.r9cdn.net/rimg/himg/62/c0/84/ice-85676218-68620422_3XL-430714.jpg"
          alt="Descripción de la imagen"
          className="h-full w-full object-cover lg:h-full lg:w-full"
        />
      </div>
      <div className="lg:w-1/2 lg:relative absolute inset-0 flex justify-center items-center">
        <div className="max-w-md px-4 py-8 bg-white rounded-lg shadow-2xl dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
