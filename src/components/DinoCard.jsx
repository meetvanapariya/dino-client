import React from 'react';
import { Link } from 'react-router-dom';

import { useDino } from '../services/dino.service';
const DinoCard = ({dinoInfo}) => {
    const imageBaseUrl = '';
    const{ favouriteDinoIds , addFavouriteDino , removeFavouriteDino} = useDino();
    const {id,name , pronunciation,meaningOfName,diet,length,period , mya , info} = dinoInfo;

    const isFavourite = favouriteDinoIds.length && favouriteDinoIds.includes(id);
    const handleOnFavouriteClick = () =>{
        if(isFavourite){
            removeFavouriteDino(id);
            return;
        }
        addFavouriteDino(id);
    }
    return(
       <div className={`card dino-card ${isFavourite ? 'is-favourite has-background-primary-light' : ''}`}>
           <button className="button is-ghost is-pulled-right" onClick={handleOnFavouriteClick}>
           {isFavourite ? <i className="fa fa-heart is-danger"></i> : <i className="far fa-heart"></i>}
           </button>
           <div className="card-content">
               <p className="title is-3">
                   <Link to={`/dinos/${id}`}>{name}</Link>
               </p>
               <p className="subtitle is-6">{pronunciation}</p>
               <div className="content">
                   <span className="icon-text">
                       <span className="icon">
                           <i className="far fa-clock"></i>
                       </span>
                       <span>{mya} Millions Year</span>
                   </span>
                   <span className="icon-text">
                       <span className="icon">
                           <i className="fas fa-bone"></i>
                       </span>
                       <span>{diet}</span>
                   </span>
                   <span className="icon-text">
                       <span className="icon">
                       <i class="fas fa-ruler-vertical"></i>
                       </span>
                       <span>{length} meter</span>
                   </span>
                   <span className="icon-text">
                       <span className="icon">
                           <i className="far fa-clock"></i>
                       </span>
                       <span>{period} time</span>
                   </span>
                   <span className="icon-text">
                       <span className="icon">
                       <i class="fas fa-otter"></i>
                       </span>
                       <span>{meaningOfName}</span>
                   </span>
                   <span>
                       <p className="mt-5"><b>Details:</b></p>
                      {info.slice(0,100)}
                   </span>
               </div>
           </div>
       </div>
    )
}

export default DinoCard