const express = require('express');
const router = express.Router();

const varVal = require('../controllers/variablesValores.controller');
const apiURL = "/relacionesMetricas/";
router.get(apiURL + 'prueba', relMetrica.prueba);
router.post(apiURL , relMetrica.addVarValores);
router.delete(apiURL + ':id' , relMetrica.deleteValor);

module.exports = router;
