import React, { useState, useEffect } from 'react';
import { Table, Button } from 'flowbite-react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/product/')
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);
        setProducts(data.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:8080/api/product/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        setProducts(prevProducts => prevProducts.filter(product => product.productId !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className="overflow-x-auto flex mt-10 justify-center h-screen">
      <Table className='w-auto shadow-2xl rounded-lg'>
        <Table.Head>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Nombre del Producto</Table.HeadCell>
          <Table.HeadCell>Descripción</Table.HeadCell>
          <Table.HeadCell>Precio</Table.HeadCell>
          <Table.HeadCell>Cantidad</Table.HeadCell>
          <Table.HeadCell>Acciones</Table.HeadCell>
          {/* <Table.HeadCell>ASD</Table.HeadCell> */}
        </Table.Head>
        <Table.Body className="divide-y">
          {products.map((product, index) => (
            <Table.Row key={product.productId} className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100">
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {product.productName}
              </Table.Cell>
              <Table.Cell className='w-72'>{product.productDescription}</Table.Cell>
              <Table.Cell >${product.price}</Table.Cell>
              <Table.Cell>{product.quantity}</Table.Cell>
              <Table.Cell className='flex flex-row space-x-4'>
                <Button color="warning" size="xs" outline pill>
                  <CiEdit className="h-6 w-6" />
                </Button>
                <Button color="failure" size="xs" outline pill onClick={() => handleDeleteProduct(product.productId)}>
                  <MdDeleteForever className="h-6 w-6" />
                </Button>
              </Table.Cell>
              <Table.Cell className="px-5 py-5 text-sm bg-white border-b border-gray-200">

                {/*Diseño del texto verdecito*/}
                {/* <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                  <span aria-hidden="true" class="absolute inset-0 bg-green-200 rounded-full opacity-50">
                  </span>
                  <span class="relative">
                    active
                  </span>
                </span> */}

              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default ProductsList;
