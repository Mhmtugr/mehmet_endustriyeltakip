import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Button, Chip } from '@mui/material';

const statusColors = {
  New: "primary",
  InProduction: "warning",
  Completed: "success",
};

function ordersList() {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    api.get("/orders/list")
      .then(res => setorders(res.data))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'customer_name', headerName: 'Müşteri Adı', width: 180 },
    { field: 'product_type', headerName: 'Ürün Tipi', width: 120 },
    {
      field: 'status',
      headerName: 'Durum',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColors[params.value] || "default"}
        />
      )
    },
    { field: 'created_at', headerName: 'Oluşturulma Tarihi', width: 200 },
  ];

  return (
    <Box sx={{ height: 400, width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>Sipariş Listesi</Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/new-order"
        sx={{ mb: 2 }}
      >
        Yeni Sipariş Ekle
      </Button>
      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        autoHeight
      />
    </Box>
  );
}

export default ordersList;
