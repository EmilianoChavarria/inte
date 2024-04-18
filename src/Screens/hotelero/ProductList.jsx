import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from 'flowbite-react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { URL } from '../../ip';
import SidebarComponent from './Sidebar';
import { ComponentProduct } from './RegistrarProducto';

function Tableproducts() {
    const [products, setProducts] = useState([]);
    const [filterText, setFilterText] = useState('');

    const hotelId = localStorage.getItem('hotelIdP');

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(URL + `api/product/findByHotel/${hotelId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
                if (data.data) {
                    setProducts(data.data);
                } else {
                    setProducts([]);
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);



    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(filterText.toLowerCase()) ||
        product.price.toLowerCase().includes(filterText.toLowerCase()) ||
        product.productDescription.toLowerCase().includes(filterText.toLowerCase()) ||
        product.quantity.toLowerCase().includes(filterText.toLowerCase())
    );

    const columns = [
        { name: '#', selector: (row, index) => index + 1, sortable: true },
        { name: 'Producto', selector: (row) => row.productName, sortable: true },
        { name: 'Descripcion', selector: (row) => row.productDescription, sortable: true },
        { name: 'Precio', selector: (row) => row.price, sortable: true },
        { name: 'Cantidad', selector: (row) => row.quantity, sortable: true },
    ];

    return (
        <div className='flex '>
            <SidebarComponent />
            <div className='px-20 pt-7' style={{ marginTop: 20, width: '1000px' }}>
                <div className='flex mb-10'>
                    <h1 className='text-3xl font-bold mr-10'>Inventario por Hotel</h1>
                    <ComponentProduct />
                </div>
                {products.length > 0 ? (
                    <DataTable
                        columns={columns}
                        data={filteredProducts}
                        striped
                        highlightOnHover
                        pagination
                        paginationComponentOptions={{ rowsPerPageText: 'Filas por página:', rangeSeparatorText: 'de', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'Todos' }}
                    />
                ) : (
                    <p>No se encontraron productos para este hotel.</p>
                )}


            </div>
        </div>
    );



}

export default Tableproducts;
