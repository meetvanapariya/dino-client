import React ,{useState , useEffect }from 'react';
import { useParams } from 'react-router-dom';

import { useDino } from '../services/dino.service';
import DinoCard from './DinoCard';

const DinoBrowse = () => {
    const [dinoData , setDinoData] = useState([]);
    const [errors , setErrors] = useState(false);
    const [searchTerm , setSearchTerm] = useState('');
    const {name} = useParams();
    const { isLoading , loadDino} = useDino();
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    const fetchDinos = async (term) =>{
        setSearchTerm(term || '');
        const response = await loadDino(term);
        if(response && !response.error){
            setDinoData(response);
        }
        setErrors(response && response.error);
    }

    const handleSearchSubmit = (evt) =>{
        evt.preventDefault();
        fetchDinos(evt.target[0].value);
    };
    useEffect(()=>{
        if(!isLoading){
            fetchDinos(name || null);
        }
    },[])
    return(
       <section className="section pt-1">
           <div className="columns">
               <div className="column is-3">
                   <div className="box">
                       <h2 className="title is-size-4 has-text-centered">Search by latter</h2>
                       <div className="buttons">
                            <button onClick={() => fetchDinos(null)} className="button is-primary is-full-width">View All</button>
                            {
                                [...alphabet].map(letter =>(
                                    <button key={letter} className="button is-light mb-3" onClick={()=> fetchDinos(letter)}>{letter.toUpperCase()}</button>
                                ))
                            }
                       </div>
                   </div>
               </div>
               <div className="column">
                   <h1 className="title is-size-3">
                       {
                           name ? `Showing resutls for ${searchTerm}` : 'Showing All'
                       }
                   </h1>
                   <form onSubmit={handleSearchSubmit} className="mt-5">
                       <div className="field has-addons">
                           <div className="control is-expanded">
                               <input type="text" className="input" placeholder="Search for dino by name"/>
                           </div>
                           <div className="control">
                               <button className="is-primary button">Search Again</button>
                           </div>
                       </div>
                   </form>
                   <div className="section is-small px-0">
                       <div className="columns is-multiline">
                           {
                               !isLoading && dinoData.length > 0 && dinoData.map(dino => (
                                   <div className="column is-4">
                                       <DinoCard key={dino.id} dinoInfo={dino}/>
                                   </div>
                               ))
                           }
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
               </div>
           </div>
       </section>
    )
}

export default DinoBrowse