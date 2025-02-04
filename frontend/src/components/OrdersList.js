import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Typography,
  Box,
  Button,
  Chip,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DoneIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/HourglassEmpty";
import WarningIcon from "@mui/icons-material/Error";

const statusColors = {
  Beklemede: "warning",
  Üretimde: "primary",
  Tamamlandı: "success",
  Gecikmiş: "error",
};

const statusIcons = {
  Beklemede: <PendingIcon color="warning" />,
  Üretimde: <InfoIcon color="primary" />,
  Tamamlandı: <DoneIcon color="success" />,
  Gecikmiş: <WarningIcon color="error" />,
};

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/orders/list")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sipariş Listesi
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/new-order"
        sx={{ mb: 2 }}
      >
        Yeni Sipariş Ekle
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Müşteri Adı</TableCell>
              <TableCell>Ürün Tipi</TableCell>
              <TableCell>Miktar</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>Tahmini Teslim</TableCell>
              <TableCell>Detay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer_name}</TableCell>
                <TableCell>{order.product_type}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>
                  <Tooltip title={order.status}>
                    <Chip
                      label={order.status}
                      color={statusColors[order.status] || "default"}
                      icon={statusIcons[order.status]}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>{order.delivery_date || "Belirtilmemiş"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/order/${order.id}`)}>
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrdersList;
