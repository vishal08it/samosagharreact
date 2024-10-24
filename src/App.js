
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import CartPage from './components/Cart';
import Header from './components/Header';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
  const [cart, setCart] = useState([]); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [mobileNumber, setMobileNumber] = useState(''); 
  const [orders, setOrders] = useState([]); 

  
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  
  const handleLogin = (number) => {
    setIsAuthenticated(true);
    setMobileNumber(number); 
    
    setOrders(['Order 1', 'Order 2', 'Order 3']); 
  };

  
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Header cartItems={cart} isAuthenticated={isAuthenticated} />
      <Routes>
       <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
      <Route path="/cart" element={<CartPage cartItems={cart} removeFromCart={removeFromCart} />} />
      <Route path="/login" element={
          isAuthenticated ? <Navigate to="/profile" /> : <Login onLogin={handleLogin} />
        } />
      <Route path="/profile" element={<ProtectedRoute element={<Profile mobileNumber={mobileNumber} orders={orders} />} />} />
      </Routes>
    </Router>
  );
};

export default App;
