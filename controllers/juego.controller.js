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
    catch(err){
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
        let nombre = req.body.nombre;
        let imagen = req.body.imagen;
        let query = `INSERT INTO Juegos (titulo, imagen) VALUES (${req.body.nombre},${req.body.imagen}); `;
        if(nombre){
            let valores = [nombre];
            let columnas = ['titulo'];
            if (imagen){
                valores.push(imagen);
                columnas.push('imagen');
            }
            let query = utils.createInsertQuery('Juegos', columnas, valores);
            await connection.query(query, (err, result) => {
                res.json({
                    "status": "funcando",
                    "query": query,
                    "things": result,
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
/*
router.get(uri , (req, res) =>{
    console.log("funca");
    console.log(db);
    connection.query(db, (err, result) => {
        res.json({
            "status" : "funcando",
            "things" : result,
            "err" : err
        });
    });

});
*/