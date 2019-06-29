const { Router } = require('express');
const router = new Router();

const multer = require('multer');
const upload = multer({ dest: 'files/' });

import LeiloesController from './controllers/LeiloesController';
import UsuariosController from './controllers/UsuariosController';
import LancesController from './controllers/LancesController';

const leiloesController = new LeiloesController();
const usuariosController = new UsuariosController();
const lancesController = new LancesController();

function SafeRun(cb) {
  return function(req, res, next) {
    try {
      cb(req, res, next);
    } catch (err) {
      console.error(err);
    }
  };
}

router.post('/login', SafeRun(usuariosController.login));

router.post('/usuario', SafeRun(usuariosController.cadastrar));

router.get('/leiloes', SafeRun(leiloesController.index));

router.get('/leilao/:idLeilao', SafeRun(leiloesController.buscarLeilaoPorId));

router.get('/leiloes/:idUsuario', SafeRun(leiloesController.buscarLeiloesPorUsuario));

router.post('/lance/:idLeilao', SafeRun(lancesController.criarLance));

router.post('/leilao', upload.single('foto'), SafeRun(leiloesController.criarLeilao));

module.exports = router;
