import express from 'express';
import bodyParser from 'body-parser';

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  next();
});

app.use(require('./router'));

app.get('/healthcheck', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
