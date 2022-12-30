import style from './Filters.module.css'

const FilterBySource = ({onChange}) => {
    return (
        <div >
            <select className={`${style.select}`} onChange={onChange}>
                <option value="all">All</option>
                <option value="sourceApi">API</option>
                <option value="sourceDb">DB</option>
            </select>
        </div>
    )
};

export default FilterBySource;