import React ,{useState , useEffect }from 'react';
import { useParams } from 'react-router-dom';

import { useDino } from '../services/dino.service';

const DinoDetails = () => {
    const [dinoData , setDinoData] = useState([]);
    const [errors , setErrors] = useState(false);
    const {dinoId} = useParams();
    console.log(dinoId);
    const {
        isLoading,  
        favouriteDinoIds,
        addFavouriteDino,
        removeFavouriteDino,
        loadDino,
        loadSingleDino} = useDino();

    const { id ,name , pronunciation,meaningOfName,diet,length,period , mya ,info} = dinoData;

    const isFavourite = favouriteDinoIds.length && favouriteDinoIds.includes(id);
    const handleOnFavouriteClick = () =>{
        if(isFavourite){
            removeFavouriteDino(id);
            return;
        }
        addFavouriteDino(id);
    }

    useEffect(() =>{
        async function fetchDino() {
            const response = await loadSingleDino(dinoId);
            if(response && !response.error){
                setDinoData(response);
            }
            setErrors(response && response.error);
        }
        if(!isLoading){
            fetchDino();
        }
    },[])
    return(
        <>
        {
            !isLoading &&
            <div className={`card dino-card ${isFavourite ? 'is-favourite has-background-primary-light' : ''}`}>
            <button className="button is-ghost is-pulled-right" onClick={handleOnFavouriteClick}>
            {isFavourite ? <i className="fa fa-heart is-danger"></i> : <i className="fa fa-heart-o"></i>}
            </button>
                <div className="card-content">
                    <h1 className="title">{name}</h1>
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
                            {info}
                        </span>
                    </div>
                </div>
            </div>
        }
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
    </>
    )
}

export default DinoDetails