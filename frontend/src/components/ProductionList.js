import React, { useEffect, useState } from "react";
import api from "../services/api";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box, Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";

const statusColors = {
  Pending: "warning",
  InProgress: "primary",
  Completed: "success",
};

function ProductionList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/production/list")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "task_name", headerName: "Görev Adı", width: 200 },
    { field: "department", headerName: "Bölüm", width: 150 },
    {
      field: "status",
      headerName: "Durum",
      width: 150,
      renderCell: (params) => (
        <Chip label={params.value} color={statusColors[params.value] || "default"} />
      ),
    },
    { field: "planned_duration_days", headerName: "Planlanan Süre (gün)", width: 160 },
    { field: "created_at", headerName: "Oluşturulma Tarihi", width: 200 },
  ];

  return (
    <Box sx={{ height: 500, width: "100%", p: 3 }}>
      <Typography variant="h4" gutterBottom>Üretim Görevleri</Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/new-production"
        sx={{ mb: 2 }}
      >
        Yeni Üretim Görevi Ekle
      </Button>
      <DataGrid
        rows={tasks}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableSelectionOnClick
        autoHeight
      />
    </Box>
  );
}

export default ProductionList;
