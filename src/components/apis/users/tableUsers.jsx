import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from 'flowbite-react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import DataTable from 'react-data-table-component';

function TableUsers() {
    const [users, setUsers] = useState([]);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/api/user/findAll',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
                setUsers(data.data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleDeleteuser = (id) => {
        fetch(`http://localhost:8080/api/user/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => {
                setUsers(prevusers => prevusers.filter(user => user.userId !== id));
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    const filteredUsers = users.filter(user =>
        user.people.name.toLowerCase().includes(filterText.toLowerCase()) ||
        user.people.lastname.toLowerCase().includes(filterText.toLowerCase()) ||
        user.people.surname.toLowerCase().includes(filterText.toLowerCase()) ||
        user.email.toLowerCase().includes(filterText.toLowerCase())
    );

    const columns = [
        { name: '#', selector: (row, index) => index + 1, sortable: true },
        { name: 'Nombre', selector: (row) => row.people.name, sortable: true },
        { name: 'Primer Apellido', selector: (row) => row.people.lastname, sortable: true },
        { name: 'Segundo Apellido', selector: (row) => row.people.surname, sortable: true },
        { name: 'Email', selector: (row) => row.email, sortable: true },
        { name: 'Rol', selector: (row) => row.rol.rolName || (typeof row.rol === 'object' ? row.rol.rolId : row.rol), sortable: true },
        {
            name: 'Acciones',
            cell: (row) => (
                <div className='flex flex-row space-x-2'>
                    <Tooltip content="Ver Hoteles" placement="top" className="tooltip-centered">
                        <Button color="blue" size="xs" outline pill>
                            <FaHotel className="h-6 w-6" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Editar" placement="top" className="tooltip-centered">
                        <Button color="warning" size="xs" outline pill>
                            <CiEdit className="h-6 w-6" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Eliminar" placement="top" className="tooltip-centered">
                        <Button color="failure" size="xs" outline pill onClick={() => handleDeleteuser(row.userId)}>
                            <MdDeleteForever className="h-6 w-6" />
                        </Button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div style={{marginTop:20, maxWidth: '90%', margin: '0 auto' }}>
            <DataTable
                columns={columns}
                data={filteredUsers}
                striped
                highlightOnHover
                pagination
                paginationComponentOptions={{ rowsPerPageText: 'Filas por página:', rangeSeparatorText: 'de', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'Todos'}}
                
            />
        </div>
    );
    

}

export default TableUsers;
