const express = require('express');
const router = express.Router();

const partida = require('../controllers/partidas.controller');
const apiURL = "/partidas/";
router.get(apiURL + 'prueba', partida.prueba);
router.get(apiURL, partida.getPartidas);
router.get(apiURL + ':id/valores', partida.getPartida);
router.get(apiURL + ':id', partida.getPartidaValores);
router.post(apiURL, partida.addPartida);
router.delete(apiURL + ':id', partida.deletePartida);

module.exports = router;
