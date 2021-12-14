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

module.exports = router;