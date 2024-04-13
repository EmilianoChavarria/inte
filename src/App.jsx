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
import Habitaciones from './Screens/hotelero/Habitaciones';
import RegistrarHabitacion from './Screens/hotelero/RegistrarHabitacion';

function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/hotelview' element={<HotelViewCity />} />
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
            <EjemploCards />
        </>
    );
}

export default App;
