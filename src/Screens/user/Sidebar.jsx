import { Sidebar } from "flowbite-react";
import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";


function SidebarComponent() {

    const name = localStorage.getItem('name');
    const lastname = localStorage.getItem('lastname');
    const surname = localStorage.getItem('surname');
    const email = localStorage.getItem('email');
    return (
        <Sidebar aria-label="Sidebar with logo branding example" className="bg-gray-800 h-screen border-t border-r border-gray-200">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <div className="flex flex-col items-center mb-4">
                        <img src="https://i.ibb.co/NsBjwWd/istockphoto-1131164548-612x612.jpg" className="h-24 w-24" />
                        <span className="inline-block text-blue-600 font-bold text-lg">{name} {lastname} {surname}</span>
                        <span>{email}</span>
                    </div>
                    <Sidebar.Item className="hover:bg-blue-300" href="#" icon={FaUserEdit}>Editar Perfil</Sidebar.Item>

                </Sidebar.ItemGroup>


            </Sidebar.Items>
        </Sidebar>
    );
}

export default SidebarComponent;
