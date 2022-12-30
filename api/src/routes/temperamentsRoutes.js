const {Router} = require('express');
const temperamentsHandler = require('../controllers/temperaments');
const router = Router();


router.get('/', async(req, res) => {
    try {
        const allTemperaments = await temperamentsHandler();
        res.status(200).send(allTemperaments);
    } catch (error) {
        res.status(404).send(error.message);
    }
});









module.exports= router;