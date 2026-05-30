require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');
const {Dog, Temperament} = require('../db');


// const getDogsApi = async() => {

//     const url = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

//     if(!url) {
//         throw new Error("Can't find dog")
//     }
//     else {
//         const res = url.data.map(ele => {

//             let arrWeight = ele.weight.metric.split(' - ')
    
//             return { 
//                 id: ele.id,
//                 name: ele.name,
//                 height: ele.height.metric,
//                 weight: arrWeight.map(ele=> ele === 'NaN' ? ele = 0 : parseInt(ele)).reduce((a, b) => a + b)/2,
//                 weight_min: arrWeight[0] === 'NaN' ? '0' : arrWeight[0],
//                 weight_max: arrWeight[1] ? arrWeight[1] : '0',
//                 life_span: ele.life_span,
//                 temperament: ele.temperament,
//                 image: ele.image.url
//             }
//         });
    
//         return res;
            
//     }
    
// }

const getDogsApi = async () => {
  try {
    // Usamos la API_KEY de las variables de entorno de Render
    const API_KEY = process.env.API_KEY;

    // Hacemos la petición a la API
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
    );

    // 🚨 LOG DE CONTROL: Esto nos va a mostrar en Render qué llegó realmente
    console.log("=== CONTROL DE DATOS ===");
    console.log("¿Es un Array?:", Array.isArray(response.data));
    console.log("Contenido de response.data:", response.data);

    // Si por alguna razón no es un array, frenamos acá para que no explote la app
    if (!Array.isArray(response.data)) {
      console.log("⚠️ La API no devolvió un array válido.");
      return [];
    }

    // Si es un array, mapeamos normalmente sin el await que fallaba antes
    const res = response.data.map((ele) => {
      let arrWeight = ele.weight?.metric
        ? ele.weight.metric.split(" - ")
        : ["0"];

      return {
        id: ele.id,
        name: ele.name,
        height: ele.height?.metric || "0",
        weight: arrWeight.map((e) => (e === "NaN" ? "0" : e)),
        weight_min: arrWeight[0] === "NaN" ? "0" : arrWeight[0] || "0",
        weight_max: arrWeight[1] ? arrWeight[1] : "0",
        life_span: ele.life_span,
        temperament: ele.temperament,
        image: ele.image?.url || "", // Agregamos un condicional por si algún perro viene sin foto
      };
    });

    return res;
  } catch (error) {
    // 🚨 SI LA API DA ERROR (EJ: CREDENCIALES MALAS), MUESTRA EL ERROR REAL ACÁ:
    console.log("=== ERROR AL LLAMAR A THE DOG API ===");
    if (error.response) {
      console.log("Status del error:", error.response.status);
      console.log("Data del error de la API:", error.response.data);
    } else {
      console.log("Mensaje de error general:", error.message);
    }
    return []; // Devolvemos un array vacío seguro para que no se caiga el server
  }
};

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


