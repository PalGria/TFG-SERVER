const dbConnection = require('../connection.js');
const connection = dbConnection();
let devCtrl = {};
const utils = require('../utils.js');
devCtrl.prueba = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        res.json({
            'status': 'Probando desde dev'
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

devCtrl.addDesarrollador = async (req, res) => {
    try {
        /*
        Esta funcion agrega un desarrollador a la lista de desarrolladors 
        FORMATO JSON
        {
        "nombre" : "nombreDev",
        "imagen" : "imagen.jpg" (y añadir sistema de subida de imagen si sobra tiempo)
        }
        */
        console.log(req.body);
        let nombre = req.body.nombre;
        let imagen = req.body.imagen;
        if (nombre) {
            let valores = [nombre];
            let columnas = ['titulo'];
            if (imagen) {
                valores.push(imagen);
                columnas.push('imagen');
            }
            let query = utils.createInsertQuery('Desarrolladores', columnas, valores);
            console.log(query);
            await connection.query(query, (err, result) => {
                res.json({
                    "status": "Ok",
                    "query": query,
                    "result": result
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
devCtrl.getDesarrolladores = async (req, res) => {
    try {
        let query = `SELECT * FROM Desarrolladores;`
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
devCtrl.getDesarrollador = async (req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let query = `SELECT * FROM Desarrolladores WHERE id_dev = ${id};`
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
devCtrl.deleteDesarrollador = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            res.json({
                'status': 'Error',
                "error": "req.params.id no es un numero (id.isNaN == true)",
                "id": id
            });
        }
        let query = `DELETE FROM Desarrolladores WHERE id_dev = ${id};`;
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
devCtrl.editDesarrollador = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        let nombre = req.body.nombre;
        let imagen = req.body.imagen;
        if (id && (nombre || imagen)) {
            let valores = [nombre];
            let columnas = ['nombre'];
            valores.push(imagen);
            columnas.push('imagen');
            let query = utils.createEditQuery('Desarrolladores', id, 'id_dev', columnas, valores);
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
                    "status": "Error",
                    "err": "Falta nombre o id",
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
module.exports = devCtrl;
