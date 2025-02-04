import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Box,
  Button,
  Chip,
  Tooltip,
  IconButton,
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

  useEffect(() => {
    api
      .get("/orders/list")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "customer_name", headerName: "Müşteri Adı", width: 180 },
    { field: "product_type", headerName: "Ürün Tipi", width: 150 },
    { field: "quantity", headerName: "Miktar", width: 100 },
    {
      field: "status",
      headerName: "Durum",
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Chip
            label={params.value}
            color={statusColors[params.value] || "default"}
            icon={statusIcons[params.value]}
          />
        </Tooltip>
      ),
    },
    { field: "delivery_date", headerName: "Tahmini Teslim", width: 150 },
    {
      field: "actions",
      headerName: "Detay",
      width: 100,
      renderCell: (params) => (
        <IconButton component={Link} to={`/order/${params.row.id}`}>
          <InfoIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", p: 3 }}>
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
      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        autoHeight
      />
    </Box>
  );
}

export default OrdersList;
