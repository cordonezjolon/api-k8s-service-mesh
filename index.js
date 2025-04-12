const express = require('express');
const app = express();
const port = process.env.PORT || 3000;



const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const counter = new client.Counter({
    name: 'http_requests_total',
    help: 'Número total de solicitudes HTTP a /ping'
  });

  const responseTime = new client.Histogram({
    name: 'http_response_duration_seconds',
    help: 'Duración de respuestas HTTP',
    buckets: [0.1, 0.5, 1, 1.5]
  });
  
  
app.get('/ping', (req, res) => {
    counter.inc(); // incrementa en 1
    const end = responseTime.startTimer();
    // lógica de la respuesta...
    res.json({ message: 'pong' });
    end(); // marca el tiempo
  
});
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  });

  const errorCounter = new client.Counter({
    name: 'http_errors_total',
    help: 'Total de errores 5xx'
  });
  
  app.get('/error', (req, res) => {
    errorCounter.inc();
    res.status(500).send('Error simulado');
  });
  
app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
