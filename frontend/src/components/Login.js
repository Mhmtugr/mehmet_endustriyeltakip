// frontend/src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Şimdilik sabit bir kontrol; gerçekte backend API'nizi çağırabilirsiniz.
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      navigate('/dashboard');
    } else {
      alert('Geçersiz kullanıcı adı veya şifre');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
        <Typography variant="h4" gutterBottom>Giriş Yap</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Kullanıcı Adı"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Şifre"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Giriş Yap
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
