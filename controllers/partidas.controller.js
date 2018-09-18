const dbConnection = require('../connection.js');
const connection = dbConnection();
let partidasCtrl = {};
const utils = require('../utils.js');
partidasCtrl.prueba = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        res.json({
            'status': 'Probando desde partidas'
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            'status': 'Error',
            "error": err
        });
    }
}

partidasCtrl.addPartida = async (req, res) => {
    try {
        /*
        Esta funcion agrega un partida a la lista de partidas 
        FORMATO JSON
        {
        "usuario" : "id_usuario",
        }
        */
        console.log(req.body);
        let usuario = req.body.usuario;
        if (nombre) {
            let valores = [usuario];
            let columnas = ['usuario'];
            let query = utils.createInsertQuery('Partidas', columnas, valores);
            console.log(query);
            await connection.query(query, (err, result) => {
                res.json({
                    "status": "Ok",
                    "query": query,
                    "result": result,
                    "err": err
                });
            });
        }
        else{
            res.json({
                'status': 'Error',
                "error": "Falta el nombre"
            })
        }
    }
    catch (err) {
        console.log(err);
        res.json({
            'status': 'Error',
            "error": err
        });
    }
}
partidasCtrl.getPartidas = async (req, res) => {
    try {
        let query = `SELECT * FROM Partidas;`
        await connection.query(query, (err, result) => {
            res.json(result);
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            'status': 'Error',
            "error": err
        });
    }
}
partidasCtrl.getPartida = async (req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let query = `SELECT * FROM Partidas WHERE id_partida = ${id};`
            await connection.query(query, (err, result) => {
                res.json(result);
            });
        }
    }
    catch (err) {
        console.log(err);
        res.json({
            'status': 'Error',
            "error": err
        });
    }
}
partidasCtrl.getPartidaValores = async (req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let query = `SELECT * FROM VariablesValores WHERE partida = ${id};`
            await connection.query(query, (err, result) => {
                res.json(result);
            });
        }
    }
    catch (err) {
        console.log(err);
        res.json({
            'status': 'Error',
            "error": err
        });
    }
}
partidasCtrl.deletePartida = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            res.json({
                'status': 'Error',
                "error": "req.params.id no es un numero (id.isNaN == true)",
                "id": id
            });
        }
        let query = `DELETE FROM partidas WHERE id_partida = ${id};`;
        await connection.query(query, (err, result) => {
            res.json({
                "status": "borrado(?)",
                "query": query,
                "result": result,
                "err": err
            });
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            'status': 'Error',
            "error": err
        });
    }
}
module.exports = partidasCtrl;
