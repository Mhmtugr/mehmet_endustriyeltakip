// frontend/src/components/AIResult.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Paper, Typography } from '@mui/material';

function AIResult() {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    // Örneğin, sabit parametrelerle tahmin almak için (bu, gerçek kullanımda dinamik hale getirilmeli)
    api.post("/ai/predict", {
      product_type: "RMU",
      complexity_factor: "1.0",
      total_material_count: "20"
    })
    .then(res => {
      setPrediction(res.data.predicted_days);
    })
    .catch(err => console.error(err));
  }, []);

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">AI Tahmini Teslim Süresi</Typography>
      {prediction !== null ? (
        <Typography variant="body1">{prediction} gün</Typography>
      ) : (
        <Typography variant="body1">Veri yok veya model eğitilmemiş.</Typography>
      )}
    </Paper>
  );
}

export default AIResult;
