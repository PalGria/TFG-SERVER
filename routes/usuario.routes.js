const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario.controller');
const apiURL = "/usuarios/";
router.get(apiURL + 'prueba', usuario.prueba);
router.get(apiURL, usuario.getUsuarios);
router.get(apiURL + ':id', usuario.getUsuario);
router.post(apiURL, usuario.addUsuario);
router.delete(apiURL + ':id', usuario.deleteUsuario);
router.put(apiURL + ':id', usuario.editUsuario);

module.exports = router;
