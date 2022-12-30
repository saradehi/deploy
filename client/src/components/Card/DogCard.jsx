import React from "react";
import { NavLink } from "react-router-dom";
import style from '../Card/DogCard.module.css'


const DogCard = ({image, name, temperament, weight, temperaments, id}) => {


    return(
        <div >
            <div className={`${style.card}`}>
                <NavLink to={`/home/dogs/${id}`} className={`${style.navLink}`} >
                    <h3>{name}</h3>
                    <img className={`${style.img}`} src={image} alt={name}/>
                    <p>Temperament: {typeof temperament === 'string' ? temperament : temperaments ? temperaments.map(ele => ele.name).sort().join(', ') : 'Not specified' }</p>
                    <p>Average weight: {weight ? weight + ' kg': 'Not specified'}</p>
                </NavLink>
            </div>
        </div>
    )

};

export default DogCard;