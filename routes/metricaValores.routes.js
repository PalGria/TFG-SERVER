const express = require('express');
const router = express.Router();

const valores = require('../controllers/metricaValores.controller');
const apiURL = "/valores/";
router.get(apiURL + 'prueba', valores.prueba);
router.get(apiURL, valores.getAllValores);
router.post(apiURL , valores.addValores);
router.delete(apiURL + ':id' , valores.deleteValores);

module.exports = router;
