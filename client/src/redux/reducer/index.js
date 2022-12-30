import {CREATE_DOG, DELETE_DOG, FILTER_SOURCE, FILTER_TEMPERAMENTS, GET_ALL_DOGS, GET_DOGS_DETAILS, GET_TEMPERAMENTS, LOADING, LOADING_HOME, ORDER, SEARCH_BY_NAME } from "../actions";

const initialState = {
    allDogs: [],
    allTemperaments: [],
    dogs: [],
    dogDetail: {},
    loading: true,
    loadingHome: true,
    createdDog: '',
    deletedDog: ''
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                dogs: action.payload
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload
            };
        case FILTER_TEMPERAMENTS:
            const temps = state.dogs;
            const temperamentsFiltered = action.payload === 'all_temperaments' ? temps : temps.filter(ele => ele.temperament?.split(',').map(ele => ele.trim()).includes(action.payload))

            return {
                ...state,
                allDogs: temperamentsFiltered
            };
        case FILTER_SOURCE:
            const dogs = state.dogs;
            const createdFiltered = action.payload === 'all' ? dogs : action.payload === 'sourceApi' ? dogs.filter(ele => ele.id.toString().length < 4) : dogs.filter(ele => ele.id.toString().length > 4)

            return {
                ...state,
                allDogs: createdFiltered.length > 0 ? createdFiltered : "There are no dogs in your database"
            };
        case GET_DOGS_DETAILS:
            return {
                ...state,
                dogDetail: action.payload
            };
        case ORDER:
            const orderDogs = state.allDogs;
            const sorted = action.payload === 'a-z' ? orderDogs.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0) 
            : action.payload === 'z-a' ? orderDogs.sort((a, b) => a.name < b.name ? 1 : a.name > b.name ? -1 : 0) 
            : action.payload === 'min-weight' ? orderDogs.sort((a, b) => a.weight > b.weight ? 1 : a.weight < b.weight ? -1 : 0) 
            : orderDogs.sort((a, b) => a.weight < b.weight ? 1 : a.weight > b.weight ? -1 : 0)

            return {
                ...state,
                allDogs: sorted
            };
        case SEARCH_BY_NAME:
            return {
                ...state,
                allDogs: action.payload
            };
        case LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case LOADING_HOME:
            return {
                ...state,
                loadingHome: action.payload
            };
        case CREATE_DOG:
            return {
                ...state,
                createdDog: action.payload
            };
        case DELETE_DOG:
            return {
                ...state,
                deletedDog: action.payload
            }
        default: 
            return {
                ...state
            }

    }
}

export default rootReducer;