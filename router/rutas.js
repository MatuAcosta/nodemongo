const express = require('express');
const router = express.Router();



router.get("/",(req,res)=>{
    //render toma el nombre del archivo como 1er parametro y dps mandarle datos
    res.render("index",{titulo:"inicio ejs"})
})

router.get("/servicios", (req, res) => {
    res.render("servicios", {titulo: "Limpieza" });
});

module.exports = router;