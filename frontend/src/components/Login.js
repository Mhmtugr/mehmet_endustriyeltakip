import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin") {
      navigate("/dashboard");
    } else {
      alert("Geçersiz giriş bilgileri.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 6, boxShadow: 5, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Giriş Yap
        </Typography>
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
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button variant="contained" color="primary" type="submit">
              Giriş Yap
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
