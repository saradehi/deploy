import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllDogs } from "../../redux/actions";
import style from './DeleteDog.module.css'
import doggi from '../LandingPage/img/dedoArriba.png'

const DeleteDog = () => {

    const deletedDog = useSelector(state => state.deletedDog)
    const history = useHistory()
    const dispatch = useDispatch()
    const arrSep = deletedDog.split(' ')
    const length = arrSep.length
    const message = arrSep.slice(0, length - 1).join(' ')

    const handlerClick = (event) => {
        event.preventDefault();
        dispatch(getAllDogs());
        history.push('/home')
    }

    return(
        <div className={`${style.deleted}`}>
            <h1>{message}</h1>

            <div>
                <button type="button" onClick={event => handlerClick(event)}>Back to home</button>
            </div>
            <div>
                <img className={`${style.img}`} src={doggi} alt="" />
            </div>
        </div>
    )

};


export default DeleteDog;