
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import ItemModal from './ItemModal'; 
const HomePage = ({ cart, setCart }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("name-asc");

  useEffect(() => {
    
    axios.get('http://localhost:7200/api/item/list')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  
  const sortItems = (items, option) => {
    if (option === "name-asc") {
      return items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "name-desc") {
      return items.sort((a, b) => b.name.localeCompare(a.name));
    }
    return items;
  };

  const addToCart = (item, quantity) => {
    const itemInCart = cart.find(cartItem => cartItem.id === item.id);
    if (itemInCart) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  return (
    <div>
      
      <div className="sort-dropdown">
        <label htmlFor="sort">Sort By: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name-asc">Product Name: A-Z</option>
          <option value="name-desc">Product Name: Z-A</option>
        </select>
      </div>

      <div className="item-list">
        {sortItems(items, sortOption).map(item => (
          <div key={item.id} className="item-card">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name} className="item-image" />
            )}
            <h3 onClick={() => openModal(item)} className="item-name">{item.name}</h3>
            <p className="item-price">₹{item.price}</p> 
          </div>
        ))}
      </div>

      
      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={closeModal}
        addToCart={addToCart}
      />
    </div>
  );
};

export default HomePage;
