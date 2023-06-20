import React from 'react';
import './Loader.css';
import loadingImg from "../../assets/logo/loading_3.gif"
const Loader = () => {
    return (
        <div className='loading'>
            <div style={{display:"flex", justifyContent:"center"}}>
                <img style={{width:"50%"}} src={loadingImg} alt="" />
            </div>
            {/* <h1 className='shimmer'>Loading</h1> */}
        </div>
    );
};

export default Loader;