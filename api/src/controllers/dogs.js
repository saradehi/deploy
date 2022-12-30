require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');
const {Dog, Temperament} = require('../db');


const getDogsApi = async() => {

    const url = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    if(!url) {
        throw new Error("Can't find dog")
    }
    else {
        const res = await url.data.map(ele => {

            let arrWeight = ele.weight.metric.split(' - ')
    
            return { 
                id: ele.id,
                name: ele.name,
                height: ele.height.metric,
                weight: arrWeight.map(ele=> ele === 'NaN' ? ele = 0 : parseInt(ele)).reduce((a, b) => a + b)/2,
                weight_min: arrWeight[0] === 'NaN' ? '0' : arrWeight[0],
                weight_max: arrWeight[1] ? arrWeight[1] : '0',
                life_span: ele.life_span,
                temperament: ele.temperament,
                image: ele.image.url
            }
        });
    
        return res;
            
    }
    
}

const getDogsDb = async() => {

    // const findDogs = await Dog.findAll({
    //     include: {
    //         model: Temperament
    //     }
    // });

    const findDogs = await Dog.findAll({
        include: {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

    if(!findDogs) {
        throw new Error("Can't find dog")
    }

    else {
        // const findedDogs = findDogs.map(dogs => {
        //     return {
        //         id: dogs.id,
        //         name: dogs.name,
        //         height: dogs.height,
        //         weight: dogs.weight,
        //         weight_min: dogs.weight_min,
        //         weight_max: dogs.weight_max,
        //         life_span: dogs.life_span,
        //         temperament: dogs.temperament,
        //         image: dogs.image
        //     }
     
        // });
        const findDogs = await Dog.findAll({
            include: {
              model: Temperament,
              attributes: ["name"],
              through: { attributes: [] },
            },
          });
    
        return findDogs;
        
    }
};

const getAllDogs = async() => {

    const apiDogs = await getDogsApi();
    const dbDogs = await getDogsDb();

    const allDogs = [...apiDogs, ...dbDogs];

    return allDogs;

};

module.exports = {
    getDogsApi,
    getDogsDb,
    getAllDogs
}


