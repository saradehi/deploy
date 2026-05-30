const {Router} = require('express');
const temperamentsHandler = require('../controllers/temperaments');
const router = Router();


router.get('/', async(req, res) => {
    try {
        const allTemperaments = await temperamentsHandler();
        res.status(200).send(allTemperaments);
    } catch (error) {

        console.error("--- ERROR EN LA RUTA DE TEMPERAMENTS ---");
        console.error(error.message);

        
        res.status(500).send(error.message);
        // res.status(404).send(error.message);
    }
});









module.exports= router;