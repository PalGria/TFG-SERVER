const express = require('express');
const router = express.Router();

const metrica = require('../controllers/metrica.controller');
const apiURL = "/metricas/";
router.get(apiURL + 'prueba', metrica.prueba);
router.get(apiURL + ':id/valores', metrica.getValoresMetrica);
router.get(apiURL, metrica.getMetricas);
router.get(apiURL + ':id', metrica.getMetrica)
router.post(apiURL , metrica.addMetrica);
router.delete(apiURL + ':id' , metrica.deleteMetrica);
router.put(apiURL + ':id', metrica.editMetrica);

module.exports = router;
