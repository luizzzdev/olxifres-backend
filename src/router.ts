const { Router } = require('express');

const router = new Router();

import LeiloesController from './controllers/LeiloesController';
import UsuariosController from './controllers/UsuariosController';

const leiloesController = new LeiloesController();
const usuariosController = new UsuariosController();

router.post('/login', (req, res, next) => usuariosController.login(req, res, next));

router.post('/usuario', (req, res, next) => usuariosController.cadastrar(req, res, next));

router.get('/leiloes', (req, res, next) => leiloesController.index(req, res, next));

module.exports = router;
