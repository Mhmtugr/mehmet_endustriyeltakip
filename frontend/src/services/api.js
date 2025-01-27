import axios from 'axios';

// Buraya, backend'in tam URL'sini yazacaksın. Lokal test için genelde:
// const BASE_URL = "http://localhost:5000";
// Deploy ettiğinde Render adresi gibi bir şey olabilir:
// const BASE_URL = "https://mehmet-endustriyeltakip-backend.onrender.com"

const BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
