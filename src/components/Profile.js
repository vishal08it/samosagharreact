
import React from 'react';

const Profile = ({ mobileNumber, orders }) => {
  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p>Mobile Number: {mobileNumber}</p>
      <h3>Order History</h3>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{order}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
