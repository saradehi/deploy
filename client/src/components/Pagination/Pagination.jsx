import React from "react";
import style from "../Pagination/Pagination.module.css"

const Pagination = ({dogsPerPage, dogs, pagination}) => {
    const pageNumbers = [];

    for (let i = 0; i <= Math.ceil(dogs/dogsPerPage)-1; i++) {
        pageNumbers.push(i+1)
    }

    return (
        <div >
            <ul className={`${style.list}`}>
                {pageNumbers && pageNumbers.map(num => (
                            <li className={`${style.items}`} key={num}>
                                <button  onClick={() => pagination(num)}>{num}</button>
                            </li>
                        )
                    )}
            </ul>
        </div>
    )
};

export default Pagination;