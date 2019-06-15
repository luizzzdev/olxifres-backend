const { Router } = require('express');

const router = new Router();

router.get('/login', (req, res) => res.json({ login: 'ok' }));

module.exports = router;
