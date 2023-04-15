import React from 'react';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './Pages/Dashboard'
import Register from './Pages/register'
import Login from './Pages/login'
import Header from './Components/Header'

function App() {
  return (
    <>
      <Router> 
        <div className='container'>
          <Header />
          <Routes> 
            <Route path='/' element={<Dashboard />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
