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
        let nombre = req.body.nombre;
        let metrica = req.body.metrica;
        let x = req.body.x;
        let y = req.body.y;
        let z = req.body.z;

        if(metrica){
            let valores = [nombre];
            let columnas = ['titulo'];
            if (metrica){
                valores.push(metrica);
                columnas.push('metrica');
            }
            let query = utils.createInsertQuery('Juegos', columnas, valores);
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
juegoCtrl.getJuegos = async (req, res) =>{
    try {
        let query = `SELECT * FROM juegos;`
        await connection.query(query, (err, result) => {
            res.json({
                "status": "Juegos devueltos",
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
juegoCtrl.deleteJuego = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        if(isNaN(id)){
            res.json({
                'status': 'Error',
                "error": "req.params.id no es un numero (id.isNaN == true)",
                "id" : id
            });
        }
        let query = `DELETE FROM juegos WHERE id_juego = ${id};`;
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
juegoCtrl.editJuego = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        let nombre = req.body.nombre;
        let imagen = req.body.imagen;
        if(id && (nombre || imagen)){
            let valores = [nombre];
            let columnas = ['titulo'];
            if (imagen){
                valores.push(imagen);
                columnas.push('imagen');
            }
            let query = utils.createEditQuery('Juegos', id, columnas, valores);
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
module.exports = juegoCtrl;
