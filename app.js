const express = require ('express');
const app = express()
const port = process.env.PORT || 3000;

//motor de plantilla ejs para poder manejar el html dinamico.
app.set('view engine', 'ejs');
//debemos decirle a express la ruta de las vistas
app.set('views',__dirname+'/views')

//me sirve para traer los css y demas cosas que esten en la carpeta public
app.use(express.static(__dirname+'/public'))

app.get("/",(req,res)=>{
    //render toma el nombre del archivo como 1er parametro y dps mandarle datos
    res.render("index",{titulo:"inicio ejs"})
})
app.get("/servicios", (req, res) => {
    res.render("servicios", {titulo: "Limpieza" });
});
app.get("/404", (req, res) => {
    res.render("404", {titulo: "404",descripcion:"tuviste un error" });
});



app.listen(port, ()=>{
    console.log('la app esta corriendo en el puerto', port)
})