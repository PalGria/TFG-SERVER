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
metricaCtrl.addValoresMetrica = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        let metrica = req.params.id;
        let valor = req.body.id_metrica_valores;
        if(metrica && valor){
            let query = utils.createInsertQuery('RelMetricaValores', ['metrica', 'valor'], [metrica, valor]);
            await connection.query(query, (err, result) => {
                res.json({
                    "status": `Valor ${valor} agregado a metrica ${metrica}`,
                    "query": query,
                    "result": result,
                    "err": err
                });
            });
        }

        else{
            res.json({
                'status': 'Error',
                "error": 'Metrica o valor no especificado'
            });
        }

    }
    catch (err) {
        console.log(err);
        res.json({
            "status": `Error xd`,
            "query": query,
            "result": result,
            "err": err
        });
    }
}
metricaCtrl.getValoresMetrica = async (req, res) => {
    try {
        let metrica = req.params.id;
        if (metrica) {
        let query = `SELECT * FROM RelMetricaValores LEFT JOIN Valores ON RelMetricaValores.valor = Valores.id_metrica_valores WHERE metrica = ${metrica} ;`
            await connection.query(query, (err, result) => {
                res.json(result);
            });

        }
        else {
            res.json({
                'status': 'Error',
                "error": 'Metrica no especificado'
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
                    "status": "Ok",
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
            res.json(result);
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
metricaCtrl.getMetrica = async (req, res) =>{
    try {
        let id = req.params.id;
        if(id){
            let query = `SELECT * FROM Metricas WHERE id_metrica = ${id};`
            await connection.query(query, (err, result) => {
                res.json({
                    "status": "Metricas devueltos",
                    "query": query,
                    "result": result,
                    "err": err
                });
            });
        }
        else{
        res.json({
            'status': 'Error',
            "error": '404 metrica no encontrada'
        });        }
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
        let query = `DELETE FROM metricas WHERE id_metrica = ${id};`;
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
            let columnas = ['nombre'];
            if (tipo){
                valores.push(tipo);
                columnas.push('tipo');
            }
            let query = utils.createEditQuery('Metricas', id, 'id_metrica' , columnas, valores);
            await connection.query(query, (err, result) => {
                res.json({
                    "status": "Ok",
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
