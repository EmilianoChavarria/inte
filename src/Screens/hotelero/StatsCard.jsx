import React from 'react'
import image from "../../assets/img/hotel.png";
import image1 from "../../assets/img/bed.png";
import image2 from "../../assets/img/check.png";
import image3 from "../../assets/img/cross.png";
export const StatsCard = () => {


    
    return (
        <div className="flex text-gray-800">
            <div className="p-4 w-full">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white rounded p-4 shadow-md">
                            <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                                <img src={image} alt="Hotel" className="w-7 h-7" /> {/* Aquí se muestra la imagen */}
                            </div>
                            <div className="flex flex-col flex-grow ml-4">
                                <div className="text-sm text-gray-500">Hoteles Registrados</div>
                                <div className="font-bold text-lg">1259</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white shadow-md rounded p-4">
                            <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                                <img src={image1} alt="Hotel" className="w-7 h-7" /> {/* Aquí se muestra la imagen */}
                            </div>
                            <div className="flex flex-col flex-grow ml-4">
                                <div className="text-sm text-gray-500">Habitaciones Registradas</div>
                                <div className="font-bold text-lg">230</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white shadow-md rounded p-4">
                            <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500">
                                <img src={image2} alt="Hotel" className="w-7 h-7" /> {/* Aquí se muestra la imagen */}
                            </div>
                            <div className="flex flex-col flex-grow ml-4">
                                <div className="text-sm text-gray-500">Habitaciones Disponibles</div>
                                <div className="font-bold text-lg">190</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white shadow-md rounded p-4">
                            <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                                <img src={image3} alt="Hotel" className="w-7 h-7" /> {/* Aquí se muestra la imagen */}
                            </div>
                            <div className="flex flex-col flex-grow ml-4">
                                <div className="text-sm text-gray-500">Habitaciones Reservadas</div>
                                <div className="font-bold text-lg">$ 32k</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

