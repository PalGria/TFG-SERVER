const dbConnection = require('../connection.js');
const connection = dbConnection();
let juegoCtrl = {};
const utils = require('../utils.js');
juegoCtrl.prueba = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        res.json({
            'status': 'Probando desde juego'
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

juegoCtrl.addJuego = async (req, res) => {
    try {
        /*
        Esta funcion agrega un juego a la lista de juegos 
        FORMATO JSON
        {
        "nombre" : "nombreJuego",
        "imagen" : "imagen.jpg" (y añadir sistema de subida de imagen si sobra tiempo)
        }
        */
        console.log(req.body);
        let nombre = req.body.titulo;
        let imagen = req.body.imagen;
        if (nombre) {
            let valores = [nombre];
            let columnas = ['titulo'];
            if (imagen) {
                valores.push(imagen);
                columnas.push('imagen');
            }
            let query = utils.createInsertQuery('Juegos', columnas, valores);
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
juegoCtrl.getJuegos = async (req, res) => {
    try {
        let query = `SELECT * FROM juegos;`
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
juegoCtrl.getJuego = async (req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let query = `SELECT * FROM juegos WHERE id_juego = ${id};`
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
juegoCtrl.getMetricas = async (req, res) => {
    try {
        let juego = req.params.id;
        if (juego) {
            let query = `SELECT * FROM Metricas WHERE juego = ${juego};`
            await connection.query(query, (err, result) => {
                res.json({
                    "status": "Metricas de juego devueltas",
                    "query": query,
                    "result": result,
                    "err": err
                });
            });

        }
        else {
            res.json({
                'status': 'Error',
                "error": 'Juego no especificado'
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
juegoCtrl.deleteJuego = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            res.json({
                'status': 'Error',
                "error": "req.params.id no es un numero (id.isNaN == true)",
                "id": id
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
    catch (err) {
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
        let nombre = req.body.titulo;
        let imagen = req.body.imagen;
        if (id && (nombre || imagen)) {
            let valores = [nombre];
            let columnas = ['titulo'];
            valores.push(imagen);
            columnas.push('imagen');
            let query = utils.createEditQuery('Juegos', id, columnas, valores);
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
module.exports = juegoCtrl;
