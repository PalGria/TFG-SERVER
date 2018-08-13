const express = require('express');
const router = express.Router();

const juego = require('../controllers/juego.controller');
const apiURL = "/juegos/";
router.get(apiURL, juego.prueba);
router.post(apiURL, juego.addJuego);

module.exports = router;
