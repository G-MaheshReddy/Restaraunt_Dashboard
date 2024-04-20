import './App.css';
import AllProducts from './components/AllProducts';
import NavbarHead from './components/Navbar';
import NotFound from './components/NotFound';
import AddFirm from './components/Restaraunt/AddFirm';
import Welcome from './components/Welcome';
import Login from './components/forms/Login';
import Register from './components/forms/Register';
import AddProduct from './components/products/AddProduct';
import LandingPage from './pages/LandingPage';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <>
    <NavbarHead/>
   
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/addrestaraunt' element={<AddFirm/>}/>
      <Route path='/addproduct' element={<AddProduct/>}/>
      <Route path='/allproducts' element={<AllProducts/>}/>
      <Route path='/welcome' element={<Welcome/>}/>
      <Route path='*' element={<NotFound/>}/>

    </Routes>
    
    </>
  );
}

export default App;
