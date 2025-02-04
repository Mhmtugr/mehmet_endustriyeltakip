import React from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function Dashboard() {
  const data = {
    labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs"],
    datasets: [
      {
        label: "Aylık Satışlar",
        data: [100, 200, 300, 250, 400],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Siparişler */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", height: 140 }}>
            <Typography variant="h6">Toplam Siparişler</Typography>
            <Typography variant="h4">120</Typography>
          </Paper>
        </Grid>
        {/* Tamamlanan Siparişler */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", height: 140 }}>
            <Typography variant="h6">Tamamlanan</Typography>
            <Typography variant="h4" color="green">90</Typography>
          </Paper>
        </Grid>
        {/* Bekleyen Siparişler */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", height: 140 }}>
            <Typography variant="h6">Bekleyen</Typography>
            <Typography variant="h4" color="orange">30</Typography>
          </Paper>
        </Grid>
        {/* Grafik Alanı */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Aylık Satış Performansı</Typography>
            <Bar data={data} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
