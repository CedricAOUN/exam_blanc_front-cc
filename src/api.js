import axios from 'axios';

const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Comment gérer différentes URLs pour le développement, la pré-production et la production ?
const api = axios.create({
  baseURL: URL,
});

export default api;
