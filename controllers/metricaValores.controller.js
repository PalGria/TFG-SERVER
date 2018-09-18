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

metricaValoresCtrl.addValores = async (req, res) => {
    try {
        console.log('hola');
        let nombre = req.body.nombre;
        let metrica = req.body.metrica;
        let x = req.body.x;
        let y = req.body.y;
        let z = req.body.z;

        if(x){ //no meteremos valores si no tenemos un valor x o una metrica
            let valores = [x];
            let columnas = ['X'];
            if(y){
                valores.push(y);
                columnas.push('Y');    
            }
            if(z){
                valores.push(z);
                columnas.push('Z');    
            }
            if(nombre){
                valores.push(nombre);
                columnas.push('nombre');    
            }

            let query = utils.createInsertQuery('Valores', columnas, valores);
            await connection.query(query, (err, result) => {
                if(metrica){
                    let queryRel = utils.createInsertQuery('RelMetricaValores', ['metrica', 'valor'], [metrica, result.id_metrica_valores]);
                    await connection.query (queryRel);
                }
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
                "error": 'Faltan valors'
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
            res.json({
                "status": "MetricaValores devueltos",
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
