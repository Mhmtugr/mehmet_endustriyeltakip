import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/list")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Sipariş Listesi</h2>
      <Link to="/new-order">Yeni Sipariş Ekle</Link>
      <ul>
        {orders.map(o => (
          <li key={o.id}>
            {o.customer_name} - {o.product_type} (ID: {o.id})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersList;
