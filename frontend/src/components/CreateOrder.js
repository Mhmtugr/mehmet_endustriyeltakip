import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, MenuItem, Button, Container, Card, CardContent, Typography, Box } from '@mui/material';

const productOptions = ["CB", "LB", "FL", "RMU"];

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/orders", formData)
      .then(() => {
        alert('Sipariş başarıyla eklendi!');
        navigate("/orders");
      })
      .catch(() => {
        alert('Sipariş eklenirken hata oluştu.');
      });
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Yeni Sipariş Ekle</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Müşteri Adı"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              select
              fullWidth
              label="Ürün Tipi"
              name="product_type"
              value={formData.product_type}
              onChange={handleChange}
              margin="normal"
            >
              {productOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Koruma Rölesi"
              name="koruma_rolesi"
              value={formData.koruma_rolesi}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              type="number"
              fullWidth
              label="Çalışma Gerilimi"
              name="calisma_gerilimi"
              value={formData.calisma_gerilimi}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              type="number"
              fullWidth
              label="Nominal Akım"
              name="nominal_akim"
              value={formData.nominal_akim}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Akım Trafo"
              name="akim_trafo"
              value={formData.akim_trafo}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Gerilim Trafo"
              name="gerilim_trafo"
              value={formData.gerilim_trafo}
              onChange={handleChange}
              margin="normal"
            />
            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Kaydet
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CreateOrder;
