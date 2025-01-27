import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function CreateOrder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    product_type: 'RMU',
    koruma_rolesi: '',
    calisma_gerilimi: 24,
    nominal_akim: 1250,
    kontrol_gerilimi: 220,
    akim_trafo: '',
    gerilim_trafo: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/orders", formData)
      .then(res => {
        alert('Sipariş eklendi!');
        navigate("/orders");
      })
      .catch(err => {
        console.error(err);
        alert('Sipariş eklenirken hata oluştu');
      });
  }

  return (
    <div>
      <h2>Yeni Sipariş Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Müşteri Adı:</label>
          <input name="customer_name" value={formData.customer_name} onChange={handleChange}/>
        </div>
        <div>
          <label>Ürün Tipi:</label>
          <select name="product_type" value={formData.product_type} onChange={handleChange}>
            <option value="CB">CB</option>
            <option value="LB">LB</option>
            <option value="FL">FL</option>
            <option value="RMU">RMU</option>
          </select>
        </div>
        <div>
          <label>Koruma Rölesi:</label>
          <input name="koruma_rolesi" value={formData.koruma_rolesi} onChange={handleChange}/>
        </div>
        <div>
          <label>Çalışma Gerilimi:</label>
          <input type="number" name="calisma_gerilimi" value={formData.calisma_gerilimi} onChange={handleChange}/>
        </div>
        <div>
          <label>Nominal Akım:</label>
          <input type="number" name="nominal_akim" value={formData.nominal_akim} onChange={handleChange}/>
        </div>
        <div>
          <label>Kontrol Gerilimi:</label>
          <input type="number" name="kontrol_gerilimi" value={formData.kontrol_gerilimi} onChange={handleChange}/>
        </div>
        <div>
          <label>Akım Trafo:</label>
          <input name="akim_trafo" value={formData.akim_trafo} onChange={handleChange}/>
        </div>
        <div>
          <label>Gerilim Trafo:</label>
          <input name="gerilim_trafo" value={formData.gerilim_trafo} onChange={handleChange}/>
        </div>
        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}

export default CreateOrder;
