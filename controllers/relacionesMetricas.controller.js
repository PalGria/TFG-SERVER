const dbConnection = require('../connection.js');
const connection = dbConnection();
let relacionMetricas = {};
const utils = require('../utils.js');
relacionMetricas.prueba = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        res.json({
            'status': 'Probando desde relación métricas'
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

relacionMetricas.addRelMetricas = async (req, res) => {
    try {
        /*
        Esta funcion agrega un juego a la lista de juegos 
        FORMATO JSON
        {
        "titulo" : "nombreJuego",
        "imagen" : "imagen.jpg" (y añadir sistema de subida de imagen si sobra tiempo)
        }
        */
        console.log(req.body);
        let nombre = req.body.titulo;
        let met1 = req.body.met1;
        let met2 = req.body.met2;
        if (met1 && met2) {

            let valores = [];
            if (nombre) valores.push(nombre);
            else valores.push('');
            let columnas = ['nombre'];
            valores.push(met1);
            columnas.push('met1');
            valores.push(met2);
            columnas.push('met2');
            let query = utils.createInsertQuery('RelacionMetricas', columnas, valores);
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
                "error": "Faltan metricas para relacionar."
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
relacionMetricas.getRelMetricas = async (req, res) => {
    try {
        let query = `SELECT * FROM RelacionMetricas;`
        await connection.query(query, (err, result) => {
            /*res.json({
                "status": "Juegos devueltos",
                "query": query,
                "result": result,
                "err": err
            });
            */
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
relacionMetricas.getMetricasRel = async (req, res) => {
    //esta funcion devuelve todas las relaciones que tiene una métrica en particular
    try {
        let id = req.params.id;
        if (id) {
            let query = `SELECT DISTINCT * FROM relMetricas WHERE met1 = ${id} OR met2 = ${id};`
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
relacionMetricas.deleteRel = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            res.json({
                'status': 'Error',
                "error": "req.params.id no es un numero (id.isNaN == true)",
                "id": id
            });
        }
        let query = `DELETE FROM RelacionMetricas WHERE id = ${id};`;
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
module.exports = relacionMetricas;
