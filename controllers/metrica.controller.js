const dbConnection = require('../connection.js');
const connection = dbConnection();
let metricaCtrl = {};
const utils = require('../utils.js');
metricaCtrl.prueba = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        res.json({
            'status': 'Probando desde metrica'
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
metricaCtrl.addMetrica = async (req, res) => {
    try {
        /*
        Esta funcion agrega un juego a la lista de juegos 
        FORMATO JSON
        {
        "nombre" : "nombreJuego",
        "imagen" : "imagen.jpg" (y añadir sistema de subida de imagen si sobra tiempo)
        }
        */
        let nombre = req.body.nombre;
        let tipo = req.body.tipo;
        let juego = req.body.juego;
        if (juego && nombre) {
            let valores = [juego];
            let columnas = ['juego'];
            valores.push(nombre);
            columnas.push('nombre');
            if (tipo) {
                valores.push(tipo);
                columnas.push('tipo');
            }
            let query = utils.createInsertQuery('Metricas', columnas, valores);
            await connection.query(query, (err, result) => {
                res.json({
                    "status": "funcando",
                    "query": query,
                    "result": result,
                    "err": err
                });
            });
        }
        else {
            let err = 'Se necesitan los siguientes apartados para crear una métrica:';
            if (!nombre) err += ' nombre';
            if (!juego) err += ' juego'
            res.json({
                'status': 'Error',
                "error": err
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
metricaCtrl.getMetricas = async (req, res) =>{
    try {
        let query = `SELECT * FROM Metricas;`
        await connection.query(query, (err, result) => {
            res.json({
                "status": "Metricas devueltos",
                "query": query,
                "result": result,
                "err": err
            });
        });
    }
    catch(err){
        console.log(err);
        res.json({
            'status': 'Error',
            "error": err
        });
    }
}
metricaCtrl.deleteMetrica = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        if(isNaN(id)){
            res.json({
                'status': 'Error',
                "error": "req.params.id no es un numero (id.isNaN == true)",
                "id" : id
            });
        }
        let query = `DELETE FROM metrica WHERE id_metrica = ${id};`;
        await connection.query(query, (err, result) => {
            res.json({
                "status": "borrado(?)",
                "query": query,
                "result": result,
                "err": err
            });
        });
    }
    catch(err){
        console.log(err);
        res.json({
            'status': 'Error',
            "error": err
        });
    }
}
metricaCtrl.editMetrica = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        let nombre = req.body.nombre;
        let tipo = req.body.tipo;
        if(id && (nombre || tipo)){
            let valores = [nombre];
            let columnas = ['titulo'];
            if (tipo){
                valores.push(tipo);
                columnas.push('tipo');
            }
            let query = utils.createEditQuery('Metricas', id, columnas, valores);
            await connection.query(query, (err, result) => {
                res.json({
                    "status": "funcando",
                    "query": query,
                    "result": result,
                    "err": err
                });
            });
        }

    }
    catch(err){
        console.log(err);
        res.json({
            'status': 'Error',
            "error": err
        });
    }
}

module.exports = metricaCtrl;
