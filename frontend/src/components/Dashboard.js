import React from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { motion } from "framer-motion";

Chart.register(...registerables);

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

const lineData = {
  labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs"],
  datasets: [
    {
      label: "Yıllık Büyüme",
      data: [30, 50, 70, 90, 110],
      borderColor: "rgba(75, 192, 192, 1)",
      fill: false,
    },
  ],
};

const pieData = {
  labels: ["Tamamlanan", "Devam Eden", "Geciken"],
  datasets: [
    {
      data: [40, 30, 30],
      backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
    },
  ],
};

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Siparişler */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", height: 140, background: "#e3f2fd" }}>
            <Typography variant="h6">Toplam Siparişler</Typography>
            <Typography variant="h4">120</Typography>
          </Paper>
        </Grid>
        {/* Tamamlanan Siparişler */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", height: 140, background: "#e8f5e9" }}>
            <Typography variant="h6">Tamamlanan</Typography>
            <Typography variant="h4" color="green">
              90
            </Typography>
          </Paper>
        </Grid>
        {/* Bekleyen Siparişler */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", height: 140, background: "#fff3e0" }}>
            <Typography variant="h6">Bekleyen</Typography>
            <Typography variant="h4" color="orange">
              30
            </Typography>
          </Paper>
        </Grid>
        {/* Grafik Alanı */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Aylık Satış Performansı</Typography>
            <Bar data={data} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Yıllık Büyüme</Typography>
            <Line data={lineData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Sipariş Durumu</Typography>
            <Pie data={pieData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
