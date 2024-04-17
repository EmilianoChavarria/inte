import './index.css';
import Component from './components/Navbar';
import Car from './components/carousel';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Login from './Screens/Login';
import Register from './Screens/Register';
import { EjemploCards } from './components/ejemplo-cards';
import HotelViewCity from './Screens/hotel/HotelView-City';
import RoomViewHotel from './Screens/hotel/room/RoomView-Hotel';
import FindOneHotel from './Screens/hotel/FindOneHotel';
import FindOneRoom from './Screens/hotel/room/FindOneRoom';
import Products from './Screens/products/Products';
import Error from './Screens/404';
import HomeAdmin from './Screens/admin/home';
import { HomeHotelero } from './Screens/hotelero/Home';
import { RegistrarHotel } from './Screens/hotelero/RegistrarHotel';
import ProtectedRoutes from './router/ProtectedRoute';
import EditarHotel from './Screens/hotelero/EditarHotel';
import RegistrarHabitacion from './Screens/hotelero/RegistrarHabitacion';
import Profile from './Screens/user/Profile';
import HotelsByUser from './Screens/admin/HotelsByUser';
import Habitaciones from './Screens/admin/Habitaciones';
import HomeRecepcionista from './Screens/recepcionista/HomeRecepcionista';

function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/hotelview/:city' element={<HotelViewCity />} />
                    <Route path="/rooms/:hotelId" element={<RoomViewHotel />} />
                    <Route path="/findOneHotel/:hotelId" element={<FindOneHotel />} />
                    <Route path="/findOneRoom/:roomId" element={<FindOneRoom />} />
                    <Route path="/products" element={<Products />} />
                    <Route element={<ProtectedRoutes />}>
                        {/* endpoints admin */}
                        <Route path="/homeAdmin" element={<HomeAdmin />} />
                        {/* endpoint hotelero */}
                        <Route path="/homeHotelero" element={<HomeHotelero />} />
                        <Route path='/registrarHotel' element={<RegistrarHotel />} />
                        <Route path='/editarHotel/:hotelId' element={<EditarHotel />} />
                        <Route path="/habitaciones/:hotelId" element={<Habitaciones />} />
                        <Route path="/registrarHabitacion/:hotelId" element={<RegistrarHabitacion />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path='/hotels/:userId' element={<HotelsByUser />} />
                        {/* endpoint recepcionista */}
                        <Route path="/homeRecepcionista" element={<HomeRecepcionista />} />
                    </Route>

                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

function Home() {
    return (
        <>
            <Component />
            <Car />
            <div className='flex flex-col mt-10'>
                <h1 className='text-3xl font-bold pl-14 mb-6'>Encuentra el mejor hotel en la mejor ciudad</h1>
                <EjemploCards />
            </div>

        </>
    );
}

export default App;
