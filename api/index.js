const axios = require('axios');
const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api/data/', async (req, res) => {
  try {
    const url = `https://api.infojobs.net/api/9/offer`;
    const response = await axios.get(url,  { headers: {'Content-Type': 'application/json', Authorization: `Basic NjM5ZjhmNDc3NTc2NGJhNmI0NWY1MDgxODEzZjM0YmE6RE95emloSWIrMXc0UXZxbGZaRzBOdW1UY25oc1BPdytRZmQzajdRRmFHZ0xNeFVGNGU=`}});
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener los datos de la API: ${error}` });
  }
});

// Ruta de proxy para llamar a la API de destino
app.get('/api/data/:parametro', async (req, res) => {
  try {
    const parametro = req.params.parametro;
    const url = `https://api.infojobs.net/api/9/offer?${parametro}`;
    const response = await axios.get(url,  { headers: {'Content-Type': 'application/json', Authorization: `Basic NjM5ZjhmNDc3NTc2NGJhNmI0NWY1MDgxODEzZjM0YmE6RE95emloSWIrMXc0UXZxbGZaRzBOdW1UY25oc1BPdytRZmQzajdRRmFHZ0xNeFVGNGU=`}});
    res.json(response.data);
    
  } catch (error) {
    res.status(500).json({ error: `Error al obtener los datos de la API: ${error}` });
  }
});

module.exports = app;