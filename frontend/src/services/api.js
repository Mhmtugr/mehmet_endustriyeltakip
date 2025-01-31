import axios from 'axios';

const api = axios.create({
  baseURL: "https://mehmet-endustriyeltakip.onrender.com", // Backend URL'si
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
