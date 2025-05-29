const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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

        const headers = {
        'x-request-id': req.headers['x-request-id'],
        'x-b3-traceid': req.headers['x-b3-traceid'],
        'x-b3-spanid': req.headers['x-b3-spanid'],
        'x-b3-sampled': req.headers['x-b3-sampled'],
    };

    // lógica de la respuesta...
    res.json({ message: 'pong', headers });
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

 app.post('/helloservice', async (req, res) => {
   const {name, puerto} = req.body.name;
    try {
        
        const response = await fetch(`http://${name}:${puerto}/sayhello`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
      console.log('Error al obtener datos de api-reto5-s2:', error);
        res.status(500).send(`Error al obtener datos de http://${name}:${puerto}/sayhello -- ${error.message}`);
    }
  });

app.get('/sayhello', (req, res) => {
    res.json({ message: 'Hello from service' });
  });


  
app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
