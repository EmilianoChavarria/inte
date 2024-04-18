import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Label, TextInput } from 'flowbite-react';
import SidebarComponent from './Sidebar';
import RoomTypeForm from './RegistrarType';
import { URL } from '../../ip';

const validationSchema = Yup.object().shape({
    roomName: Yup.string().required('Campo Obligatorio'),
    peopleQuantity: Yup.string().required('Campo Obligatorio'),
    description: Yup.string().required('Campo Obligatorio'),
    typeId: Yup.number().required('Campo Obligatorio'),
    typeId: Yup.number().required('Campo Obligatorio').integer().positive().typeError('Tipo de dato incorrecto').transform((value, originalValue) => {
        return isNaN(value) ? undefined : value;
    })
});

const RegistrarHabitacion = () => {
    const formRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [type, setType] = useState([]);
    const { hotelId } = useParams();

    //getAll de types http://localhost:8080/api/roomType/getAll
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(URL + 'api/roomType/getAll', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setType(data.data);
            })
            .catch((error) => console.error('Error:', error));
    }, []);

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

        // Leer los archivos seleccionados como base64
        newFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Agregar la representación base64 al state
                setFieldValue('imagePreviews', [...selectedFiles, e.target.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const createObjectURL = (file) => {
        if (typeof URL !== 'undefined' && URL.createObjectURL) {
            return URL.createObjectURL(file);
        }
        return '';
    };
    return (
        <div className="flex">
            <SidebarComponent />
            <div className='flex flex-col'>
                <h1 className="text-center text-3xl font-bold mt-2 mb-2">Registrar Habitación</h1>

                <RoomTypeForm />
                <div className="flex-grow pl-4 pr-4 mb-10">
                    <Formik
                        initialValues={{
                            roomName: '',
                            peopleQuantity: '',
                            description: '',
                            status: 'true',
                            hotelId: hotelId || '',
                            images: [],
                            roomTypeId: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            const formData = new FormData();
                            values.images.forEach((file) => {
                                formData.append('images', file);
                            });

                            formData.append('roomName', values.roomName);
                            formData.append('peopleQuantity', values.peopleQuantity);
                            formData.append('description', values.description);
                            formData.append('hotelId', values.hotelId);
                            formData.append('status', values.status);
                            formData.append('roomTypeId', parseInt(values.typeId, 10));

                            const token = localStorage.getItem('token');
                            console.log('Valores del formulario:', JSON.stringify(values));
                            try {
                                const response = await fetch(URL + 'api/room/saveWithImage', {
                                    method: 'POST',
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    },
                                    body: formData
                                });

                                if (response.ok) {
                                    alert('Imagen y datos adicionales enviados con éxito.');
                                    console.log('Imagen y datos adicionales enviados con éxito.');
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
                                    <div className="px-3 space-y-3">
                                        <Label htmlFor="roomName" className="block text-sm font-medium text-gray-700">Nombre de la Habitación</Label>
                                        <Field name="roomName" as={TextInput} variant="standard" label="Nombre de la Habitación" className="w-full" />
                                        <ErrorMessage name="roomName" component="div" className="text-red-500" />
                                        <Label htmlFor="peopleQuantity" className="block text-sm font-medium text-gray-700">Cantidad de Personas</Label>
                                        <Field name="peopleQuantity" as={TextInput} variant="standard" label="Cantidad de Personas" className="w-full" />
                                        <ErrorMessage name="peopleQuantity" component="div" className="text-red-500" />
                                        <Label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</Label>
                                        <Field name="description" as={TextInput} variant="standard" label="Descripción" className="w-full" />
                                        <ErrorMessage name="description" component="div" className="text-red-500" />
                                        <div>
                                            <label htmlFor="typeId" className="block text-sm font-medium text-gray-700">Tipo de Habitación</label>
                                            <Field as="select" name="typeId" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option value=""></option>
                                                {Array.isArray(type) && type.map((item) => {
                                                    return (
                                                        <option key={item.roomTypeId} value={item.roomTypeId}>Tipo: {item.typeName}, precio: ${item.price}</option>
                                                    );
                                                })}
                                            </Field>
                                            <ErrorMessage name="typeId" component="div" className="text-red-500" />
                                        </div>
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
                                                        src={selectedFiles[index] instanceof File ? createObjectURL(file) : file}
                                                        
                                                        style={{ maxWidth: 250, maxHeight: 200, marginBottom: 10 }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center mt-4">
                                    <Button type="submit" disabled={isSubmitting}>
                                        Registrar
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

        </div>
    );
};

export default RegistrarHabitacion;
