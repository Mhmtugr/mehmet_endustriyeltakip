import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, Button, Container, Card, CardContent, Typography, Box } from "@mui/material";

const departmentOptions = ["Montaj", "Kaynak", "Elektrik", "Test", "Sevkiyat"];

function CreateProduction() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    task_name: "",
    description: "",
    department: "",
    planned_duration_days: 1,
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/production", formData)
      .then(() => {
        alert("Üretim görevi başarıyla eklendi!");
        navigate("/production");
      })
      .catch(() => {
        alert("Üretim görevi eklenirken hata oluştu.");
      });
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Yeni Üretim Görevi Ekle</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Görev Adı"
              name="task_name"
              value={formData.task_name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Açıklama"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Bölüm"
              name="department"
              value={formData.department}
              onChange={handleChange}
              margin="normal"
              required
            >
              {departmentOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField
              type="number"
              fullWidth
              label="Planlanan Süre (gün)"
              name="planned_duration_days"
              value={formData.planned_duration_days}
              onChange={handleChange}
              margin="normal"
              required
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

export default CreateProduction;
