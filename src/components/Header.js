
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; 

const Header = ({ cartItems, removeFromCart }) => {
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const navigate = useNavigate();
  const cartItemCount = cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="header">
      
      <div className="logo">
        <img src="/Samosa Ghar.png" alt="Samosa Ghar Logo" className="logo-image" />
      </div>
      <h1>Samosa Ghar</h1>
     
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/offers">Offers</Link>
        <Link to="/help">Help</Link>
      </nav>

      
      <div className="auth-cart">
        <button onClick={handleSignInClick}>Sign In</button>
        
        <div className="cart" onClick={handleCartClick}>
          <span role="img" aria-label="cart">🛒</span>
          <span>Cart ({cartItemCount})</span>
        </div>
      </div>

      
      {showCartDropdown && (
        <div className="cart-dropdown">
          <h3>Cart Items</h3>
          {cartItems.length > 0 ? (
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} - ₹{item.price} x {item.quantity}
                  <button onClick={() => removeFromCart(item.id)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty</p>
          )}
          <div>
            <h4>Total: ₹{totalPrice}</h4>
            <Link to="/cart">Go to Cart</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
