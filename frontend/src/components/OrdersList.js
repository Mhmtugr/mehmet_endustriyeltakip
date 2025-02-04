import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, Chip, Paper, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";

const statusColors = {
  New: "primary",
  InProduction: "warning",
  Completed: "success",
};

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/orders/list")
      .then(res => setOrders(res.data))
      .catch(err => {
        console.error(err);
        setError("Siparişler yüklenirken bir hata oluştu.");
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "customer_name", headerName: "Müşteri Adı", width: 180 },
    { field: "product_type", headerName: "Ürün Tipi", width: 150 },
    {
      field: "status",
      headerName: "Durum",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColors[params.value] || "default"}
        />
      )
    },
    { field: "created_at", headerName: "Oluşturulma Tarihi", width: 200 },
  ];

  return (
    <Container maxWidth="lg">
      <Paper component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} sx={{ p: 4, mt: 6, boxShadow: 5, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>Sipariş Listesi</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button variant="contained" color="primary" component={Link} to="/new-order">
            Yeni Sipariş Ekle
          </Button>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={orders}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            autoHeight
            components={{
              NoRowsOverlay: () => (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Sipariş bulunamadı.
                  </Typography>
                  <Button variant="contained" color="primary" component={Link} to="/new-order">
                    Yeni Sipariş Ekle
                  </Button>
                </Box>
              ),
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
}

export default OrdersList;
