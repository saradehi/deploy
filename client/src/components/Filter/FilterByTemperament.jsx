import style from "./Filters.module.css"

const FilterbyTemperament = ({onChange, temperament}) => {


    return(
        <>
            <select className={`${style.select}`} onChange={onChange} > 
                <option value="all_temperaments">All temperaments</option>
                {
                    temperament?.map(ele => {
                        return (
                            <option value={ele.name} key={ele.id}>{ele.name}</option>
                        )
                    })
                }
            </select>
        </>
    )
};

export default FilterbyTemperament;