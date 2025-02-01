// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: "https://mehmet-endustriyeltakip.onrender.com", // Backend URL'nizi buraya girin
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
