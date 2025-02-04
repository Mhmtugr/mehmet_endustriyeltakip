import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin") {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Geçersiz kullanıcı adı veya şifre.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} sx={{ p: 4, mt: 6, boxShadow: 5, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          🔐 Giriş Yap
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
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
