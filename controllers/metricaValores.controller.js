const dbConnection = require('../connection.js');
const connection = dbConnection();
let metricaValoresCtrl = {};
const utils = require('../utils.js');
metricaValoresCtrl.prueba = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        res.json({
            'status': 'Probando desde valoresmatrica'
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
metricaValoresCtrl.getValoresPorJuego = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        //TODO Cambiar aqui para que además de todo lo que hay en MetricaValores de el conjunto de variablesValores
        const juego = req.body.juego;          
        let query = `SELECT * FROM Valores WHERE juego = ${juego};`
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
metricaValoresCtrl.getValoresPorMetrica = async (req, res) => { 
    try{
        const metrica = req.body.metrica;          
        let query = `SELECT * FROM metricaValores WHERE metrica = ${metrica} LEFT JOIN Valores ON metricaValores.valor = Valores.id_metrica_valores;`
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
metricaValoresCtrl.addValoresToMetrica = async (req, res) => { 
    try{
        const metrica = req.body.metrica;
        const valor = req.body.valor;          
        if(metrica && valor){

            let query = utils.createInsertQuery('RelMetricaValores', ['metrica', 'valor'], [metrica, valor]);
            await connection.query(query, (err, result) => {
                res.json({
                    "status": "Ok",
                    "query": query,
                    "result": result,
                    "err": err
                });
            });
        }
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

metricaValoresCtrl.deleteValoresFromMetricas = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try{
        const metrica = req.body.metrica;
        const valor = req.body.valor;          
        if(metrica && valor){

            let query = `DELETE FROM RelMetricaValores WHERE metrica = ${metrica} AND  valor = ${valor};`;
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
            "error": 'Falta o metrica o valor',
            "metrica" : metrica, 
            "valor" : valor
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
metricaValoresCtrl.addValores = async (req, res) => {
    try {
        console.log('hola');
        let nombre = req.body.nombre;
        let x = req.body.x;
        let y = req.body.y;
        let z = req.body.z;
        let juego = req.body.juego; 
        let tipo = req.body.tipo; 

        if(nombre){ //no meteremos valores si no tenemos un valor x o una metrica
            let valores = [nombre];
            let columnas = ['Nombre'];

            if(y){
                valores.push(y);
                columnas.push('Y');    
            }
            if(z){
                valores.push(z);
                columnas.push('Z');    
            }
            if(x){
                valores.push(x);
                columnas.push('X');    
            }
            if(juego){
                valores.push(juego);
                columnas.push('juego');
            }
            if(tipo){
                valores.push(tipo);
                columnas.push('tipo');
            }
            else{
                valores.push('sum');
                columnas.push('tipo');
            }
            let query = utils.createInsertQuery('Valores', columnas, valores);
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
                "error": 'Falta nombre'
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
metricaValoresCtrl.getAllValores = async (req, res) =>{
    try {
        //TODO Cambiar aqui para que además de todo lo que hay en MetricaValores de el conjunto de variablesValores
        let query = `SELECT * FROM Valores;`
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
metricaValoresCtrl.editValores = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        let nombre = req.body.nombre;
        let juego = req.body.juego;
        let tipo = req.body.tipo;
        let color = req.body.color;

        if(id && nombre){
            let valores = [nombre];
            let columnas = ['nombre'];
            if(juego){
                valores.push(juego);
                columnas.push('juego');
            }
            if(tipo){
                valores.push(tipo);
                columnas.push('tipo');
            }
            if(color){
                valores.push(color);
                columnas.push('color');
            }
            let query = utils.createEditQuery('Valores', id, 'id_metrica_valores' , columnas, valores);
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


metricaValoresCtrl.deleteValores = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        if(isNaN(id)){
            res.json({
                'status': 'Error',
                "error": "req.params.id no es un numero (id.isNaN == true)",
                "id" : id
            });
        }
        let query = `DELETE FROM Valores WHERE id_metrica_valores = ${id};`;
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

module.exports = metricaValoresCtrl;
