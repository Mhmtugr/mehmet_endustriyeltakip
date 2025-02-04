import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';
import { motion } from 'framer-motion';

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        Mehmet Endustriyeltakip Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Sipariş Yönetimi Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, alignItems: 'center', justifyContent: 'center', background: '#e3f2fd' }}>
            <Typography variant="h6">Siparişler</Typography>
            <Typography>
              <Link to="/orders">📦 Siparişleri Görüntüle</Link>
            </Typography>
          </Paper>
        </Grid>

        {/* Üretim Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, alignItems: 'center', justifyContent: 'center', background: '#fce4ec' }}>
            <Typography variant="h6">Üretim</Typography>
            <Typography>
              <Link to="/production">🏭 Üretim Planlaması</Link>
            </Typography>
          </Paper>
        </Grid>

        {/* Envanter Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, alignItems: 'center', justifyContent: 'center', background: '#e8f5e9' }}>
            <Typography variant="h6">Envanter</Typography>
            <Typography>
              <Link to="/inventory">📋 Envanter Raporları</Link>
            </Typography>
          </Paper>
        </Grid>

        {/* Raporlar Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, alignItems: 'center', justifyContent: 'center', background: '#fff3e0' }}>
            <Typography variant="h6">Raporlar</Typography>
            <Typography>
              <Link to="/reports/dashboard">📊 Üretim Raporları</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Grafikler */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">📊 Satış ve Üretim Verileri</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <BarChart
                series={[{ data: [10, 20, 15, 30, 25, 40, 50] }]}
                xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] }]}
                width={500}
                height={300}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <PieChart
                series={[
                  { data: [{ id: 0, value: 40, label: 'Tamamlanan' }, { id: 1, value: 30, label: 'Devam Eden' }, { id: 2, value: 30, label: 'Geciken' }] },
                ]}
                width={400}
                height={300}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;
