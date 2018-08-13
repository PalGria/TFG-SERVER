const dbConnection = require('../connection.js');
const connection = dbConnection();
let juegoCtrl = {};

juegoCtrl.prueba = async (req, res) => { //usaremos esto como plantilla, además de prueba
    try {
        res.json({
            'status': 'Probando',
        });
    }
    catch{
        console.log(err);
        res.json({
            'status': 'Error',
            "error": err
        });
    }
}

juegoCtrl.addJuego = async (req, res) => {
    try {
        //"nombre" : "nombreJuego",
        //"imagen" : "imagen.jpg" (y añadir sistema de subida de imagen si sobra tiempo)
        let nombre = req.body.nombre;
        let imagen = req.body.imagen;
        let query = `INSERT INTO Juegos (Nombre, Imagen) VALUES (${req.body.nombre},${req.body.imagen}); `;
        if(nombre){
            let query = `INSERT INTO Juegos (Nombre, Imagen) VALUES (${req.body.nombre},${req.body.imagen}); `;
            if(imagen){
                query += ",imagen);"
            }
            else{
                query += ");";
            }
            console.log(query);
            await connection.query(query, (err, result) => {
                res.json({
                    "status": "funcando",
                    "things": result,
                    "err": err
                });
            });
        }
    }
    catch{
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