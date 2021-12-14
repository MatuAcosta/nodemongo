const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota')

router.get('/', async (req,res)=>{
    try {
        const mascotasDB = await Mascota.find({});
        res.render("mascotas", {
            mascotas: mascotasDB
        })
    } catch (error) {
        console.log(error)
    }
})
router.get('/crear', (req,res)=>{
    res.render('crear')
})
router.get('/:id', async (req,res)=>{ //vamos a leer esta ruta dinamicamente debido a q es el id de la mascot
    const _id = req.params.id
    try {
        const mascotaDB = await Mascota.findOne({_id:_id});
        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        })
    } catch (error) {
        console.log(error)
        res.render('detalle', {
            error: true,
            mensaje: 'No existe la mascota todavia'
        })
    }
}) 
router.post('/' , async (req,res)=>{
    const body = req.body; //esto me trae lo del formulario a traves de bodyparser
    try {
        const mascotadb = new Mascota (body)
        await mascotadb.save()
        res.redirect('/mascotas')
    } catch (error) {
        console.log('error')
    }
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    try {
        const mascotadb = await Mascota.findOneAndDelete({_id:id})
        console.log(mascotadb)
        if (!mascotadb) throw res.json({estado:false, mensaje: 'No se pudo eliminar'});
        
        res.json({
            estado:true,
            mensaje:"eliminado"
        })


    } catch (error) {
        console.log(error)
    }

} )

router.put('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        const body = req.body
        console.log(body)
        const mascota = await Mascota.findByIdAndUpdate(id,body,{ useFindAndModify: false })
        res.json({
            estado:true,
            mensaje:"mascota editada"
        })

    } catch (error) {
        res.json({
            estado:false,
            mensaje:"mascota no editada"
        })
    }
})

module.exports = router;

//otra forma de crear 
/*
        await Mascota.create(body)
        res.redirect('/mascotas')
*/ 