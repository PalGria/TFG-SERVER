const dbConnection = require('../connection.js');
const connection = dbConnection();
let variablesValores = {};
const utils = require('../utils.js');
variablesValores.prueba = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        res.json({
            'status': 'Probando desde variablesValores'
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

variablesValores.addVarValores = async (req, res) => {
    try {
        /*
        Esta funcion agrega un juego a la lista de juegos 
        FORMATO JSON
        {
        "metricaValor" : "valor merica",
        "partida" : "partida",
        "X" : "valor de X",
        "Y" : "valor de Y",
        "Z" : "valor de Z"
        }
        */
        console.log(req.body);
        let metricaValor = req.body.metricaValor;
        let partida = req.body.partida;
        let X = req.body.X;
        let Y = req.body.Y;
        let Z = req.body.Z;

        if (metricaValor && !X.isNaN) {
            //si no hay o metrica o valor no meto nada
            let valores = [metricaValor];
            let columnas = ['metricaValor'];
            valores.push(X);
            columnas.push('X');
            if (partida) {
                valores.push(partida);
                columnas.push('partida');
            }
            if (!Y.isNaN) {
                valores.push(Y);
                columnas.push('Y');
            }
            if (!Z.isNaN) {
                valores.push(Z);
                columnas.push('Z');
            }

            let query = utils.createInsertQuery('VariablesValores', columnas, valores);
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
variablesValores.deleteValor = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            res.json({
                'status': 'Error',
                "error": "req.params.id no es un numero (id.isNaN == true)",
                "id": id
            });
        }
        let query = `DELETE FROM VariablesValores WHERE id_var = ${id};`;
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
module.exports = variablesValores;
