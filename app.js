const express = require ('express');
const app = express()

//dotenv para poder ocultar variables de entorno
require('dotenv').config()
const port = process.env.PORT;

//conexion a una bd de mongo a traves de mongoose
const mongoose = require('mongoose');

//ESTOS VALORES OCULTAREMOS UTILIZANDO DOTENV
/*const user = 'usuario2';
const password = 'olakase123';
const dbname = 'veterinaria'*/
// url de conexion
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.6ce2y.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`; 

mongoose.connect(uri)
.then(()=> console.log('Base de datos configurada'))
.catch( e => console.log(e))

//motor de plantilla ejs para poder manejar el html dinamico.
app.set('view engine', 'ejs');
//debemos decirle a express la ruta de las vistas
app.set('views',__dirname+'/views')

//me sirve para traer los css y demas cosas que esten en la carpeta public
//middleware
app.use(express.static(__dirname+'/public'));

//rutas
app.use('/',require('./router/rutas'));
app.use('/mascotas', require('./router/mascotas'))

app.use((req, res,next) => {
    res.status(404).render("404", {titulo: "404",
    descripcion:"tuviste un error" });
});



app.listen(port, ()=>{
    console.log('la app esta corriendo en el puerto', port)
})