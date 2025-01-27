import axios from 'axios';

// Buraya, backend'in tam URL'sini yazacaksın. Lokal test için genelde:
// const BASE_URL = "http://localhost:5000";
// Deploy ettiğinde PythonAnywhere adresi gibi bir şey olabilir:
const BASE_URL = "https://username.pythonanywhere.com";

// Gerçek kullanıcının PythonAnywhere kullanıcı adını girin
const BASE_URL = "https://Mhmtugr.pythonanywhere.com";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
