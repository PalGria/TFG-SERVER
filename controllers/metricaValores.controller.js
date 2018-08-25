const dbConnection = require('../connection.js');
const connection = dbConnection();
let juegoCtrl = {};
const utils = require('../utils.js');
juegoCtrl.prueba = async (req, res) => { //usaremos esto como plantilla, además de prueba
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

juegoCtrl.addValores = async (req, res) => {
    try {
        console.log('hola');
        let nombre = req.body.nombre;
        let metrica = req.body.metrica;
        let x = req.body.x;
        let y = req.body.y;
        let z = req.body.z;

        if(metrica && x){ //no meteremos valores si no tenemos un valor x o una metrica
            let valores = [metrica];
            let columnas = ['metrica'];
            valores.push(x);
            columnas.push('X');
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

            let query = utils.createInsertQuery('MetricaValores', columnas, valores);
            await connection.query(query, (err, result) => {
                res.json({
                    "status": "funcando",
                    "query": query,
                    "result": result,
                    "err": err
                });
            });
        }
        else{
            res.json({
                'status': 'Error',
                "error": 'Falta la metrica o los valors'
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
juegoCtrl.getAllValores = async (req, res) =>{
    try {
        let query = `SELECT * FROM MetricaValores;`
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
juegoCtrl.deleteValores = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        if(isNaN(id)){
            res.json({
                'status': 'Error',
                "error": "req.params.id no es un numero (id.isNaN == true)",
                "id" : id
            });
        }
        let query = `DELETE FROM MetricaValores WHERE id_metrica_valores = ${id};`;
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

module.exports = juegoCtrl;
