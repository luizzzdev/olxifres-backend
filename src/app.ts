import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(require('./router'));

require('./database');

app.get('/healthcheck', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
