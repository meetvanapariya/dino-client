import React, {useState , useEffect} from 'react';

import { useDino } from '../services/dino.service';
import { withAuthenticationRequired } from '../services/auth.service';

import DinoCard from './DinoCard';

const Favourites = () => {
    const [dinoData,setDinoData] = useState([]);
    const [errors , setErrors] = useState(false);
    const {isLoading , favouriteDinoIds , loadDino} = useDino();
    const fetchDinos = async(term) =>{
        const response = await loadDino(term);
        if(response && !response.error){
            setDinoData(response);
        }
        setErrors(response && response.error);
    }
    useEffect(()=>{
        fetchDinos(null);
    },[])
    return(
       <section className="section pt-1">
           <h1 className="title is-size-3">View your favourite dinosaures</h1>
           <div className="section is-small px-0">
               <div className="columns is-multiline">
                   {!isLoading && dinoData.length > 0 && dinoData.filter(dinoItem =>favouriteDinoIds.includes(dinoItem.id)).map(dino => (
                       <div className="column is-3">
                           <DinoCard key={dino.id} dinoInfo={dino}/>
                       </div>
                   ))}
               </div>
               {
                    isLoading && <progress className="progress is-small is-info">25%</progress>
                }
                {
                    !isLoading && dinoData.length <= 0 && (
                        <div className="content">
                            <p className="has-text-centered subtitle is-size-4">Sorry No data Found!</p>
                        </div>
                    )
                }
           </div>
       </section>
    )
}

export default withAuthenticationRequired(
    Favourites,{location:"/favourites"}
)