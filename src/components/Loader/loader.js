import React from 'react'
import '../Loader/loader.css'




   const Loader = (props) =>{
       if(props.loader === "true"){
        return(
            <div>
                 <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
            </div>
            )
        }
        
        else
        {
            return(
            <div></div>
            )
        }
}
export default Loader;