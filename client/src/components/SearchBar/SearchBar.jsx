import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import { searchByName } from "../../redux/actions";

const SearchBar = ({setCurrentPage}) => {

    const dispatch = useDispatch();
    const [breed, setBreed] = useState('');

    const handlerInputChange = (event) => {
        event.preventDefault();
        setBreed(event.target.value);
        
    };

    const handlerSubmit = (event) => {
        event.preventDefault();
        if(breed.length === 0) {
            alert('Type a breed');
        }
        else {
            dispatch(searchByName(breed));
            setBreed('');
            setTimeout(() => {
                setCurrentPage(1);
            }, 750)
        }
        
    }


    return (
        <div>
            <input 
            type='text' 
            placeholder='Search by breed...' 
            value={breed} 
            onKeyPress={event => event.key === "Enter" && handlerSubmit(event)} 
            onChange={event => handlerInputChange(event)} 
            />
            <button type='submit' onClick={event => handlerSubmit(event)}>Search</button>
        </div>
    )

}

export default SearchBar;