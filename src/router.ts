const { Router } = require('express');

const router = new Router();

import UsuariosController from './controllers/UsuariosController';

const usuariosController = new UsuariosController();

router.post('/login', (req, res, next) => usuariosController.login(req, res, next));

router.post('/usuario', (req, res, next) => usuariosController.cadastrar(req, res, next));

module.exports = router;
