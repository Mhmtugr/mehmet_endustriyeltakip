// frontend/src/components/Dashboard.js
import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom>
        Mehmet Endustriyeltakip Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Sipariş Yönetimi Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6">Siparişler</Typography>
            <Typography>
              <Link to="/orders">Siparişleri Görüntüle</Link>
            </Typography>
          </Paper>
        </Grid>
        {/* Üretim Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6">Üretim</Typography>
            <Typography>
              <Link to="/production">Üretim Planlaması</Link>
            </Typography>
          </Paper>
        </Grid>
        {/* Envanter Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6">Envanter</Typography>
            <Typography>
              <Link to="/inventory">Envanter Raporları</Link>
            </Typography>
          </Paper>
        </Grid>
        {/* Raporlar Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6">Raporlar</Typography>
            <Typography>
              <Link to="/reports/dashboard">Üretim Raporları</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* Diğer modüller, grafikler ve AI tahmin sonuçlarını burada entegre edebilirsiniz */}
    </Container>
  );
}

export default Dashboard;
