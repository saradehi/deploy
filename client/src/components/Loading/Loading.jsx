import React from "react";
import style from './Loading.module.css'

const Loading = () => {

    return (
        <>        
            <div className={`${style.container}`}>
                <div className={`${style.loader}`}></div>
                <p>Loading...</p>
            </div>
        </>
    )
};

export default Loading;