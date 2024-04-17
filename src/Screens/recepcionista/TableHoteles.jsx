import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from 'flowbite-react';
import { FaBoxOpen, FaCalendarCheck } from "react-icons/fa";
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { URL } from '../../ip';

const Hoteles = () => {
    const [hotels, setHotels] = useState([]);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        fetch(URL + 'api/hotel/getAll')
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
                setHotels(data.data);
            })
            .catch(error => console.error('Error fetching hotels:', error));
    }, []);

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    const filteredHotels = hotels.filter(hotel =>
        hotel.hotelName.toLowerCase().includes(filterText.toLowerCase()) ||
        hotel.address.toLowerCase().includes(filterText.toLowerCase()) ||
        hotel.email.toLowerCase().includes(filterText.toLowerCase()) ||
        hotel.city.toLowerCase().includes(filterText.toLowerCase())
    );

    const columns = [
        { name: '#', selector: (row, index) => index + 1, sortable: true },
        { name: 'Nombre', selector: (row) => row.hotelName, sortable: true },
        { name: 'Dirección', selector: (row) => row.address, sortable: true },
        { name: 'Ciudad', selector: (row) => row.city, sortable: true },
        {
            name: 'Acciones',
            cell: (row) => (
                <div className='flex flex-row justify-end space-x-2'>
                    <Tooltip content="Reservaciones" placement="top" className="tooltip-centered">
                        <Link to={`/hotels/${row.hotelId}`}>
                            <Button color="blue" size="xs" outline pill>
                                <FaCalendarCheck className="h-6 w-6" />
                            </Button>
                        </Link>
                    </Tooltip>
                    <Tooltip content="Inventario" placement="top" className="tooltip-centered">
                        <Link to={`/hotels/${row.hotelId}`}>
                            <Button color="success" size="xs" outline pill>
                                <FaBoxOpen className="h-6 w-6" />
                            </Button>
                        </Link>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className='flex flex-col items-center mt-10'>
            <h1 className='text-3xl font-bold'>Lista de hoteles</h1>
            <div className="mt-4 mb-6">
                <input
                    type="text"
                    className="border rounded px-2 py-1"
                    placeholder="Buscar hotel..."
                    value={filterText}
                    onChange={handleFilterChange}
                />
            </div>
            <div style={{ width: '1000px' }}>
                <DataTable
                    columns={columns}
                    data={filteredHotels}
                    striped
                    highlightOnHover
                    pagination
                    paginationComponentOptions={{ rowsPerPageText: 'Filas por página:', rangeSeparatorText: 'de', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'Todos' }}
                />
            </div>
        </div>
    );
}


export default Hoteles;
