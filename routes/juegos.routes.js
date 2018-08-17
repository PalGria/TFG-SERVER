const express = require('express');
const router = express.Router();

const juego = require('../controllers/juego.controller');
const apiURL = "/juegos/";
router.get(apiURL + 'prueba', juego.prueba);
router.get(apiURL, juego.getJuegos);
router.get(apiURL + 'juego/:id', juego.getJuego);
router.get(apiURL + 'juego/:id/metricas', juego.getMetricas);
router.post(apiURL, juego.addJuego);
router.put(apiURL+ ':id', juego.editJuego);
router.delete(apiURL + ':id', juego.deleteJuego);

module.exports = router;
