import React, { useState, useRef } from 'react';
import SidebarComponent from './Sidebar';
import { Button, FloatingLabel } from 'flowbite-react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { URL } from '../../ip';

const validationSchema = Yup.object().shape({
    hotelName: Yup.string().required('Campo Obligatorio'),
    email: Yup.string().email('Introduce un email válido').required('Campo Obligatorio'),
    address: Yup.string().required('Campo Obligatorio'),
    phone: Yup.string().required('Campo Obligatorio'),
    city: Yup.string().required('Campo Obligatorio'),
    userId: Yup.number().required('Campo Obligatorio'),
    description: Yup.string().required('Campo Obligatorio'),
});

export const RegistrarHotel = () => {
    const formRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const userId = localStorage.getItem('userId');

    const handleFileChange = (event, setFieldValue) => {
        const files = event.target.files;

        if (files.length + selectedFiles.length > 3) {
            alert('No se pueden seleccionar más de 3 imágenes.');
            setSelectedFiles([]);
            return;
        }

        const newFiles = [];
        for (let i = 0; i < Math.min(files.length, 3 - selectedFiles.length); i++) {
            const file = files[i];
            newFiles.push(file);
        }

        setSelectedFiles([...selectedFiles, ...newFiles]);
        setFieldValue('images', [...selectedFiles, ...newFiles]);
    };

    const handleRemoveFile = (index, setFieldValue) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
        setFieldValue('images', newFiles);
    };

    return (
        <div className="flex">
            <SidebarComponent />
            <div className="flex-grow pl-4 pr-4">
                <h1 className="text-center text-3xl font-bold mt-2 mb-2">Registrar Hotel</h1>
                <Formik
                    initialValues={{
                        hotelName: '',
                        email: '',
                        address: '',
                        phone: '',
                        city: '',
                        userId: userId || '',
                        description: '',
                        images: [],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        const formData = new FormData();
                        values.images.forEach((file) => {
                            formData.append('images', file);
                        });

                        formData.append('hotelName', values.hotelName);
                        formData.append('email', values.email);
                        formData.append('address', values.address);
                        formData.append('phone', values.phone);
                        formData.append('city', values.city);
                        formData.append('userId', values.userId);
                        formData.append('description', values.description);

                        const token = localStorage.getItem('token');
                        console.log('Valores del formulario:', JSON.stringify(values));


                        try {
                            const response = await fetch(URL+'api/hotel/saveHotelWithImages', {
                                method: 'POST',
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                                body: formData,
                            });
                        
                            if (response.ok) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Hotel registrado',
                                    text: 'Imagen y datos adicionales enviados con éxito.',
                                });
                                resetForm();
                                setSelectedFiles([]);
                            } else {
                                console.error('Error al enviar la imagen y datos adicionales:', response.statusText);
                            }
                        } catch (error) {
                            console.error('Error al enviar la imagen y datos adicionales:', error);
                        } finally {
                            setSubmitting(false);
                        }
                        
                    }}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form ref={formRef}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-200 rounded-xl p-4 shadow-xl">
                                <div className='px-3 space-y-3'>
                                    <Field name="hotelName" as={FloatingLabel} variant="standard" label="Nombre del Hotel" className="w-full" />
                                    <ErrorMessage name="hotelName" component="div" className="text-red-500" />
                                    <Field name="address" as={FloatingLabel} variant="standard" label="Dirección" className="w-full" />
                                    <ErrorMessage name="address" component="div" className="text-red-500" />
                                    <Field name="email" as={FloatingLabel} variant="standard" label="Email" type="email" className="w-full" />
                                    <ErrorMessage name="email" component="div" className="text-red-500" />
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2'>
                                        <div className='flex flex-col'>
                                            <Field name="phone" as={FloatingLabel} className='w-11/12' variant="standard" label="Teléfono" />
                                            <ErrorMessage name="phone" component="span" className="text-red-500" />
                                        </div>
                                        <div className='flex flex-col'>
                                            <Field name="city" as={FloatingLabel} variant="standard" label="Ciudad" className="w-full" />
                                            <ErrorMessage name="city" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                    <Field name="userId" as={FloatingLabel} variant="standard" label="ID del Usuario" type="number" className="w-full hidden" />
                                    <ErrorMessage name="userId" component="div" className="text-red-500" />
                                    <Field name="description" as={FloatingLabel} variant="standard" label="Descripción" className="w-full" />
                                    <ErrorMessage name="description" component="div" className="text-red-500" />
                                </div>
                                <div>
                                    <input type="file" accept=".jpg" multiple onChange={(event) => handleFileChange(event, setFieldValue)} className="mb-4" />
                                    <div className="grid grid-cols-1 sm:grid-cols-2">
                                        {selectedFiles.map((file, index) => (
                                            <div key={index} className="relative">
                                                <button
                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                                    onClick={() => handleRemoveFile(index, setFieldValue)}
                                                >
                                                    X
                                                </button>
                                                <img
                                                    className='object-cover'
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Preview ${index}`}
                                                    style={{ maxWidth: 250, maxHeight: 200, marginBottom: 10 }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-4">
                                <Button type="submit" disabled={isSubmitting}>Registrar</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );

};
