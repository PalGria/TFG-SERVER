const express = require('express');
const router = express.Router();

const relMetrica = require('../controllers/relacionesMetricas.controller');
const apiURL = "/relacionesMetricas/";
router.get(apiURL + 'prueba', relMetrica.prueba);
router.get(apiURL + ':id', relMetrica.getMetricasRel);
router.post(apiURL , relMetrica.addRelMetricas);
router.delete(apiURL + ':id' , relMetrica.deleteRel);

module.exports = router;
