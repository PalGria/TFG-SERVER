const dbConnection = require('../connection.js');
const connection = dbConnection();
let usuarioCtrl = {};
const utils = require('../utils.js');
usuarioCtrl.prueba = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        res.json({
            'status': 'Probando desde usuario'
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

usuarioCtrl.addUsuario = async (req, res) => {
    try {
        /*
        Esta funcion agrega un Usuario a la lista de Usuarios 
        FORMATO JSON
        {
        "alias" : "alias usuario",
        }
        */
        console.log(req.body);
        let alias = req.body.alias;
        if (alias) {
            let valores = [alias];
            let columnas = ['alias'];
        }
        let query = utils.createInsertQuery('Usuarios', columnas, valores);
        console.log(query);
        await connection.query(query, (err, result) => {
            res.json({
                "status": "Ok",
                "query": query,
                "result": result
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
usuarioCtrl.getUsuarios = async (req, res) => {
    try {
        let query = `SELECT * FROM Usuarios;`
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
usuarioCtrl.getUsuario = async (req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let query = `SELECT * FROM Usuarios WHERE id_usuario = ${id};`
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
usuarioCtrl.deleteUsuario = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            res.json({
                'status': 'Error',
                "error": "req.params.id no es un numero (id.isNaN == true)",
                "id": id
            });
        }
        let query = `DELETE FROM usuarios WHERE id_usuario = ${id};`;
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
usuarioCtrl.editUsuario = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        let alias = req.body.alias;
        if (id && alias) {
            let valores = [alias];
            let columnas = ['alias'];
            let query = utils.createEditQuery('Usuarios', id, columnas, valores);
            await connection.query(query, (err, result) => {
                res.json({
                    "status": "Ok",
                    "query": query,
                    "result": result,
                    "err": err
                });
            });
        }
        else {
            res.json({
                "status": "Error",
                "err": "Falta alias",
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
module.exports = usuarioCtrl;
