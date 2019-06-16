import express from 'express';
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(require('./router'));

app.get('/healthcheck', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
