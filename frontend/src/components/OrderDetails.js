import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Typography, Box, Paper, CircularProgress, Chip, Alert, Container } from "@mui/material";
import { motion } from "framer-motion";

const statusColors = {
  New: "primary",
  InProduction: "warning",
  Completed: "success",
  Delayed: "error",
};

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sipariş yüklenirken hata oluştu:", err);
        setError("Sipariş yüklenirken bir hata oluştu.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h5" sx={{ mt: 4 }}>
          Sipariş bulunamadı.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} sx={{ p: 3 }}>
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Sipariş Detayları (ID: {order.id})
          </Typography>
          <Typography variant="h6">
            Müşteri Adı: {order.customer_name}
          </Typography>
          <Typography variant="h6">
            Ürün Tipi: {order.product_type}
          </Typography>
          <Typography variant="h6">
            Durum: <Chip label={order.status} color={statusColors[order.status] || "default"} />
          </Typography>
          <Typography variant="h6">
            Tahmini Teslim Tarihi: {order.estimated_delivery_days ? `${order.estimated_delivery_days} gün içinde` : "Hesaplanamadı"}
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5">Ekstra Notlar</Typography>
          <Typography>{order.notes || "Not bulunmamaktadır."}</Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default OrderDetails;
