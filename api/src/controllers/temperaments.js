require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');
const {Temperament} = require('../db')

const temperamentsHandler = async() => {

    const temperamentsDb = await Temperament.findAll() 

    if(temperamentsDb.length > 0) {
        return [...temperamentsDb]
    } 

    
    else {
        // Bring all temperaments from API
        const url = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        let res = await url.data.map(ele => ele.temperament);
        res = res.join(', ').split(',').map(ele => ele.trim())
        let filteredTemps = res.filter(ele => ele !== "")
        const uniqueTemps = [...new Set(filteredTemps)]
        const sortedTemps = [...uniqueTemps].sort();
        let apiTemps = [];

        if(uniqueTemps.length > 0) {
            apiTemps = sortedTemps.map(ele => {
               return {
                   name: ele
               }
           });

           const tempsCreatedDb = await Temperament.bulkCreate(apiTemps);
           let lastArr= [...tempsCreatedDb, ...temperamentsDb];
           return lastArr;

        } else {
            throw new Error('No temperaments founded')
        }
    }





};


module.exports = temperamentsHandler;

