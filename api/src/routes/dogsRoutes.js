const {Router} = require('express');
const { getAllDogs } = require('../controllers/dogs');
const router = Router();
const {Dog, Temperament} = require('../db');


// Promises

router.get('/', (req, res) => {
    
    const {name} = req.query;
    
    getAllDogs().then(response => {  
        if(name) {
            let dogName = response.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase()));
            if(dogName.length > 0) {
                return res.status(200).send(dogName);
            } else return res.status(404).send(`"${name[0].toUpperCase()+name.toLowerCase().slice(1)}" dog not found`);
        } 
        res.status(200).send(response)
    })
    .catch(error => error)
});
// router.get('/', async (req, res) => {
    
//     const {name} = req.query;
//     const response = await getAllDogs()
    
//     try {
//         if(name) {
//             let dogName = response.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase()));
//             if(dogName.length > 0) {
//                 return res.status(200).send(dogName);
//             } else {
//                 throw new Error(`"${name[0].toUpperCase()+name.toLowerCase().slice(1)}" dog not found`)
//             }

//         }  else {
//             throw new Error('Missing info')
//         }
//     } catch (error) {
//         res.status(404).send('Error')
//     }
// });

// Async Await

router.get('/:id', async(req, res) => {

    const {id} = req.params;
    const allDogs = await getAllDogs();

    try {
        if(id) {
            const dogsId = allDogs.find(ele => ele.id.toString() === id.toString());
    
            if(!dogsId) {
                res.status(404).send(`¡UPS! Dog not found`);
            } else res.status(200).send(dogsId)
        }
    
    } catch (error) {
        res.status(404).send("Can't find dog")
    }

});

router.post('/', async(req, res) => {

    const {name, height_min, height_max, weight_min, weight_max, life_span, image, temperament } = req.body;

    try {
        if(!name || !height_min || !height_max || !weight_max || !weight_min) {
            res.status(404).send('Missing info')
        }; 


        let weightP = (parseInt(weight_min) + parseInt(weight_max)) / 2;
        let heightTotal = `${height_min} - ${height_max}`

        const newDog = await Dog.create({
            name: name[0].toUpperCase() + name.slice(1),
            height_min,
            height_max,
            height: heightTotal,
            weight_min,
            weight_max,
            weight: weightP,
            life_span,
            image:image ? image : "https://ae01.alicdn.com/kf/H2a77ef5575d648c5b30b54416099ae20O/Peluca-de-cosplay-para-perros-accesorios-de-cabeza-falsa-para-perros-peque-os-medianos-y-grandes.jpg_Q90.jpg_.webp",
            // temperament: temperament.split(', ').map(ele=> ele.trim()[0].toUpperCase() + ele.trim().slice(1)).join(', ')
            
        });

        if(temperament) {
            let arrTemp = temperament.split(',').map(ele => ele.trim()[0].toUpperCase() + ele.trim().slice(1))
        
            
            arrTemp.forEach(async (ele) => {
                
                let index = await Temperament.findOrCreate({
                    where: {name: ele}
                })
                await newDog.addTemperament(index[0]);
                // [{id: jhjdkhd, name: idhoidhd}, true/false]
            });

            // sin el foreach : let index = await Temperament.findOrCreate({where: {name: arrTemp}}) await newDog.addTemperament(index[0])
            
        }
        // res.status(201).json('¡Congratulations! Dog created successfully');
        res.status(201).send(newDog);
    } catch (error) {
        res.status(404).send('Your dog can not be created');
    }

});


router.delete('/:id', async(req, res) => {

    const {id} = req.params;

    try {
        if(id) {
            const deleted = await Dog.destroy({
                where: {
                    id
                }
            })

            res.json(`Dog deleted successfully ${id}`)
        } else {
            res.status(404).send(`Your dog couldn't be deleted, please try again later ${id}`)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }

});


module.exports = router;