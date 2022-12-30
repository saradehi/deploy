import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dogCreate, getAllDogs, getTemperaments } from "../../redux/actions";
import {useHistory, NavLink} from 'react-router-dom'
import style from './CreateDog.module.css'


const CreateDog = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector(state => state.allTemperaments)
    const createdDog = useSelector(state => state.createdDog);
    const [show, setShow] = useState(false)
    const [createTemp, setCreateTemp] = useState('')
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        weight_min: '',
        weight_max: '',
        height_min: '',
        height_max: '',
        life_span: '',
        temperament: [],
        image: ''
    });
    let uniques = [... new Set(input.temperament)];
    let filtered = uniques.filter(ele => ele !== '');

    const regularExp = '^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$';
    const regularExpNum = '^[0-9]+$';

    const onValidateName = () => {
        
        if(!input.name) {
            errors.name = 'A name is required'
        } else if(!input.name.match(regularExp)){
            errors.name = "Invalid name"
        } else if(input.name.length > 20) {
            errors.name = "Max characters exceded"
        } else if(input.name.length < 3){
            errors.name = 'Too short! Name requires at least 3 characters'
        } else {
            errors.name = ''
        }
        setErrors({
                ...errors,
                name: errors.name
            })
    }

    const onValidateWeightMin = () => {

        if(!input.weight_min) {
            errors.weight_min = 'A min weight is required'
        } else if(!input.weight_min.match(regularExpNum)){
            errors.weight_min = 'Only numbers allowed'
        } else if(parseInt(input.weight_min) < 0){
            errors.weight_min = 'Negative numbers are not allowed'
        } else if(parseInt(input.weight_min) > 100) {
            errors.weight_min = 'Weight cannot be over 100'
        } else {
            errors.weight_min = ''
        }

        setErrors({
                ...errors,
                weight_min: errors.weight_min
            })
    }

    const onValidateWeightMax = () => {
        if(!input.weight_max) {
            errors.weight_max = 'A max weight is required'
        } else if(parseInt(input.weight_max) < parseInt(input.weight_min)){
            errors.weight_max = 'Max weight cannot be lower than min weight'
        } else if(parseInt(input.weight_max) > 200) {
            errors.weight_max = 'Weight cannot be over 200'
        } else if(!input.weight_max.match(regularExpNum)){
            errors.weight_max = 'Only numbers allowed'
        } else {
            errors.weight_max = ''
        }

        setErrors({
                ...errors,
                weight_max: errors.weight_max
            })
    }

    const onValidateHeightMin = () => {
        if(!input.height_min) {
            errors.height_min = 'A min height is required'
        } else if(!input.height_min.match(regularExpNum)){
            errors.height_min = 'Only numbers allowed'
        } else if(parseInt(input.height_min) > 200) {
            errors.height_min = 'Height cannot be over 200'
        } else {
            errors.height_min = ''
        }

        setErrors({
                ...errors,
                height_min: errors.height_min
            })
    }

    const onValidateHeightMax = () => {
        if(!input.height_max) {
            errors.height_max = 'A max height is required'
        } else if(parseInt(input.height_max) < parseInt(input.height_min)){
            errors.height_max = 'Max height cannot be lower than min height'
        } else if(parseInt(input.height_max) > 300) {
            errors.height_max = 'Height cannot be over 300'
        } else if(!input.height_max.match(regularExpNum)){
            errors.height_max = 'Only numbers allowed'
        } else {
            errors.height_max = ''
        }

        setErrors({
                ...errors,
                height_max: errors.height_max
            })
    }

    const onValidateTemperaments = () => {
        if(input.temperament < 1) {
            errors.temperament = 'At least one temperament is required'
        } else {
            errors.temperament = ''
        }

        setErrors({
                ...errors,
                temperament: errors.temperament
            })
    }

    const onValidateTemperamentInput = () => {
        if(createTemp) {
            if(createTemp.length < 3) {
                errors.inputTemp = 'Too short! Temperament requires at least 3 characters'
            } else if (!/^[a-zA-Z]*$/.test(createTemp)){
                errors.inputTemp = 'Characters not allowed'
            } else {
                errors.inputTemp = ''
            }
        }
        setErrors({
            ...errors,
            inputTemp: errors.inputTemp
        })
    }

    const handlerChangeTempInput = (event) => {
        setCreateTemp(event.target.value)
    } ;


    const handleDelete = (event) => {
        setInput({
            ...input,
            temperament: input.temperament.filter(e => e !== event.target.value)
        })

    };

    const handlerChange = (event) => {
        setInput({
            ...input,
            [event.target.name] : event.target.value
        });
    };

    const handlerChangeTemps =  (event) => {
        let arr = !input.temperament.includes(createTemp) && !input.temperament.includes(event.target.value) ? [...input.temperament, createTemp, event.target.value] : [...input.temperament, event.target.value]
        setInput({
            ...input,
            temperament: arr.filter(ele => ele !== "")
        })
    };

    const handlerClickHome = (event) => {
        event.preventDefault();
        dispatch(getAllDogs());
        history.push('/home')
    };

    const handlerSubmit = async (event) => {
        event.preventDefault();
        dispatch(dogCreate({
            ...input,
            temperament: input.temperament.join(', ')
        }));
        setInput({
            name: '',
            weight_min: '',
            weight_max: '',
            height_min: '',
            height_max: '',
            life_span: '',
            temperament: [],
            image: ''
        });
        setCreateTemp('')
        setShow(true)

    };

    const activeSubmit = () => {
        if(errors.name || errors.weight_max || errors.weight_min || errors.height_max || errors.height_min || errors.temperament || errors.inputTemp) {
            return true
        } else if(input.temperament.length < 1 || !input.name || !input.weight_max || !input.weight_min || !input.height_max || !input.height_min) {
            return true
        } else return false
    }

    useEffect(() => {
        dispatch(getTemperaments())
        setShow(false)
        setErrors({})
    }, []);

    return (
        <div className={`${style.mainContainer}`}>
            <h1>Create Dog</h1>
            <button onClick={event => handlerClickHome(event)}>Back to home</button>
            <form id="Create-Dog" onSubmit={event => handlerSubmit(event)}>
                <div className={`${style.inputContainer}`}>
                    <div className={`${style.div}`}>
                        <label className={`${style.label}`}>Name:  </label> 
                        <input className={`${style.input}`} type="text" value={input.name} name="name" onBlur={onValidateName} onChange={handlerChange} placeholder='e.g: Firulais' />
                    </div>
                   <div className={`${style.error}`}>
                    
                        {
                            errors.name &&
                                (<span className="error">{errors.name}</span>)
                        }       
                    </div>            
                </div>
                <div>
                    <div className={`${style.div}`}>
                        <label className={`${style.label}`} >Min weight:  </label>  
                        <input className={`${style.input}`} type="text" value={input.weight_min} name="weight_min" onBlur={onValidateWeightMin} onChange={handlerChange} placeholder='e.g: 10' /> 
                    </div>
                    <div className={`${style.error}`}>
                        {
                            errors.weight_min && 
                                (<span className="error">{errors.weight_min}</span>)
                        }         
                    </div>         
                </div>
                <div>
                    <div className={`${style.div}`}>
                        <label className={`${style.label}`} >Max weight:  </label>   
                        <input className={`${style.input}`} type="text" value={input.weight_max} name="weight_max" onBlur={onValidateWeightMax} onChange={handlerChange} placeholder='e.g: 20' />
                    </div>
                    <div className={`${style.error}`}>
                        {
                            errors.weight_max && 
                                (<span className="error">{errors.weight_max}</span>)
                        }
                    </div>                       
                </div>
                <div>
                    <div className={`${style.div}`}>
                        <label className={`${style.label}`} >Min height:  </label>     
                        <input className={`${style.input}`} type="text" value={input.height_min} name="height_min" onBlur={onValidateHeightMin} onChange={handlerChange} placeholder='e.g: 25' />
                    </div>    
                    <div className={`${style.error}`}>
                        {
                            errors.height_min && 
                                (<span className="error">{errors.height_min}</span>)
                        }     
                    </div>            
                </div>
                <div>
                    <div className={`${style.div}`}>
                        <label className={`${style.label}`} >Max height:  </label>    
                        <input className={`${style.input}`} type="text" value={input.height_max} name="height_max" onBlur={onValidateHeightMax} onChange={handlerChange} placeholder='e.g: 30' /> 
                    </div> 
                    <div className={`${style.error}`}>
                        {
                            errors.height_max && 
                                (<span className="error">{errors.height_max}</span>)
                        }  
                    </div>           
                </div>
                <div>
                   <div className={`${style.div}`}>
                        <label className={`${style.label}`} >Life span:  </label>
                        <input className={`${style.input}`} type="text" value={input.life_span} name="life_span" onChange={handlerChange} placeholder='e.g: 14 - 20 years' />
                   </div>
                    <div className={`${style.error}`}>
                        {
                            errors.life_span && 
                                (<span className="error">{errors.life_span}</span>)
                        }
                    </div>
                </div>
                <div>
                    <div className={`${style.div}`}>
                        <span className={`${style.label}`}>Temperaments: </span>
                        <select className={`${style.select}`} onChange={event => handlerChangeTemps(event)} onBlur={onValidateTemperaments}>
                    {
                        temperaments?.map(ele => {
                            return(
                                <option value={ele.name} key={ele.id}  name={ele.name}>{ele.name}</option>
                            )
                        })
                    }
                    </select>
                    </div>
                    <div className={`${style.error}`}>
                        {
                            errors.temperament && 
                                (<span className="error">{errors.temperament}</span>)
                        }
                    </div>

                </div>
                <div>
                    <div className={`${style.div}`}>
                        <label className={`${style.label}`}>Create new temperament:  </label> 
                        <input className={`${style.inputTemp}`} type="text" value={createTemp} name='createTemp' onBlur={onValidateTemperamentInput} onChange={event => handlerChangeTempInput(event)} placeholder="Other Temperament..." />
                        <button className={`${style.button}`} type="button" onClick={event => handlerChangeTemps(event)}>Add</button>
                    </div>
                    <div className={`${style.error}`}>
                        {
                            errors.inputTemp && 
                                (<span className="error">{errors.inputTemp}</span>)
                        }
                    </div>
                </div>
                <div>
                    <div className={`${style.div}`}>
                        <label className={`${style.label}`} > Image:  </label>
                        <input className={`${style.input}`} type="url" value={input.image} name="image" onChange={handlerChange}placeholder="https://perrito.jpg" />
                    </div>
                </div>
            </form>
            <div>
            <p>You have selected the contious temperaments: </p>
                {
                
                filtered?.map((ele, i) => {
                    
                    return(
                        <button onClick={event => handleDelete(event)} value={ele} type='reset' key={i}>{ele} X</button>
                        )
                    })
                    
                }
            </div>
            <br />
            <div>
                <button disabled={activeSubmit()} form="Create-Dog" type="submit">Create Dog</button>
            </div>
            <div>
                {
                    show === true && createdDog ? <p>Dog Created successfully. <NavLink to={`/home/dogs/${createdDog.id}`} className={`${style.link}`}>Click here</NavLink> to see details</p> : show === true && !createdDog ? <p>Dog could not be created</p> : <p></p>

                }
            </div>
        </div>
    )

}


export default CreateDog;