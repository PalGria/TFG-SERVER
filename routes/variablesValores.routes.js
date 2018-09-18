const express = require('express');
const router = express.Router();

const varVal = require('../controllers/variablesValores.controller');
const apiURL = "/relacionesMetricas/";
router.get(apiURL + 'prueba', varVal.prueba);
router.post(apiURL , varVal.addVarValores);
router.delete(apiURL + ':id' , varVal.deleteValor);

module.exports = router;
