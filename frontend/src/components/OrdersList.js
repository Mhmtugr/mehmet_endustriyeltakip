import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import api from "../services/api";

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/list")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "customer_name", headerName: "Müşteri", width: 180 },
    { field: "product_type", headerName: "Ürün Tipi", width: 150 },
    {
      field: "status",
      headerName: "Durum",
      width: 150,
      renderCell: (params) => <Chip label={params.value} color={params.value === "Completed" ? "success" : "warning"} />
    },
    { field: "created_at", headerName: "Tarih", width: 200 },
  ];

  return (
    <Box sx={{ height: 500, width: "100%", p: 3 }}>
      <Typography variant="h4" gutterBottom>Siparişler</Typography>
      <Button variant="contained" color="primary" component={Link} to="/new-order" sx={{ mb: 2 }}>
        Yeni Sipariş Ekle
      </Button>
      <DataGrid rows={orders} columns={columns} pageSize={5} />
    </Box>
  );
}

export default OrdersList;
