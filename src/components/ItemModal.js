
import React, { useEffect, useState } from 'react';
import './ItemModal.css';

const ItemModal = ({ item, isOpen, onClose, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1); 
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleAddToCart = () => {
    addToCart(item, quantity);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <img src={item.imageUrl} alt={item.name} className="modal-item-image" />
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>Price: ₹{item.price}</p>
        <div className="quantity-selector">
          <button onClick={() => setQuantity(Math.max(quantity - 1, 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
