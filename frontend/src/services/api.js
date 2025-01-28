import axios from 'axios';

// Backend'in tam URL'sini buraya yaz. Lokal geliştirme için:
// const BASE_URL = "http://localhost:5000";

// Deploy ettiğinde PythonAnywhere veya başka bir sunucu adresini kullan:
const BASE_URL = "https://Mhmtugr.pythonanywhere.com";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;

