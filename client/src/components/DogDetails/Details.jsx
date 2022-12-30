import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteDog, getDogDetails } from "../../redux/actions";
import Loading from "../Loading/Loading";
import { loading } from "../../redux/actions";
import { NavLink, useHistory } from "react-router-dom";
import style from "./Details.module.css"



const DogDetails = ({match}) => {
// estado local loading - setLoading // useState(false)
// condicional si es true (return p loading - setTimeOut 3000) cambiar setstate a false // si es false renderiza el componente
    
    let isLoading = useSelector(state => state.loading)
    const dog = useSelector(state => state.dogDetail)
    const [deleted, setDeleted] = useState(false)
    const [warning, setWarning] = useState(false)
    const dogId = match.params.id
    const dispatch = useDispatch();
    const history = useHistory();



    useEffect(() => {
        dispatch(getDogDetails(dogId))
        setTimeout(() => {
            dispatch(loading(false))
        }, 900)
        setDeleted(false)
    }, []);

    const handlerDelete = (event) => {
        event.preventDefault();
        if(deleted === false) {
            setDeleted(true)
            setWarning(true)
        } else {
            dispatch(deleteDog(event.target.value))
            setTimeout(() => {
                history.push('/home/deleted')
            }, 900)
        }
    }


    return (
        <div className={`${style.container}`}>

            {
                isLoading === true ? <Loading></Loading> 
                : <>
                    <div className={`${style.button}`}>
                        <button type="button"  style={{width: '8rem', height: '1.5rem'}} ><NavLink className={`${style.link}`} to={'/home'}>Back to home</NavLink></button>
                    </div>
                    <div className={`${style.containerTitle}`}>
                        <h1>{dog.name}</h1>
                    </div>
                    <div className={`${style.containerSecond}`}>
                        <img className={`${style.img}`} src={dog.image} alt={dog.name} />
                        <div className={`${style.details}`}>
                            <h3>TEMPERAMENTS: {dog.temperament ? dog.temperament.split(', ').map(ele => ele.trim()[0].toUpperCase()+ele.trim().slice(1)).sort(). join(', ') : dog.temperaments.map(ele => ele.name).sort().join(', ')}</h3>
                            <h4>WEIGHT: {dog.weight_min !== '0' && dog.weight_max !== '0' ? `${dog.weight_min} - ${dog.weight_max} kg` : 'Not specified'}</h4>
                            <h4>HEIGHT: {dog.height} cm</h4>
                            <h4>LIFE SPAN: {!dog.life_span ? "10 - 15 years" : dog.life_span.split(' ').length > 1 ? dog.life_span : `${dog.life_span} years`}</h4>
                        </div>
                    </div>
                    <br />
                    <div>
                        {
                            dogId.length > 3 && 
                            <div>
                                <p>This dog belongs to database, it can be deleted.</p>
                                <button type="button" value={dogId} onClick={event => handlerDelete(event)}>Delete dog</button>
                            </div>
                        }
                        {
                        warning === true && 
                            <div className={`${style.warning}`}>
                                <h4>You sure you want to delete this dog?</h4>
                                <p>This action cannot be undone</p>
                            </div>
                        }
                    </div>
                </>
            }

            
        </div>
    )
};

export default DogDetails;