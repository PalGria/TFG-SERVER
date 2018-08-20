const express = require('express');
const morgan = require('morgan');
const app = express();
const cors  = require('cors');
//const {mongoose} = require  ("./database.js") conexion aqui

//Settings----
app.set('port', process.env.PORT || 3000);
//Middlewares 
app.use(morgan('dev'));
app.use(express.json());
var allowedOrigins = ['http://localhost:4200']; //poner aqui a donde se va a llamar
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.static(__dirname + '/static')); //Serves resources from static folder//Routes
//Routes
app.use('/api',require('./routes/prueba.routes.js'));
app.use('/api',require('./routes/juegos.routes.js'));
app.use('/api',require('./routes/metrica.routes.js'));

//Starting server
app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
})