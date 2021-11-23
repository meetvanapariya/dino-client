import React from 'react';
import { useHistory } from 'react-router-dom';
import logoImg from '../assets/Digimon-PNG-Free-Download.png'
const DinoSearch = () => {
    const history = useHistory();
    const handleLuckeyClick = () =>{
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const randChar = alphabet[Math.floor(Math.random()  * alphabet.length)];
        history.push(`/browse/${randChar}`);
    }
    const handleSearchSubmit = (evt) =>{
        evt.preventDefault();
        const searchTerm = evt.target[0].value;
        history.push(`/browse/${searchTerm}`);
    }
    return(
       <section className="is-medium section">
            <div className="columns">
                <div className="column is-6 is-offset-3">
                    <div className="is-flex is-flex-direction-column is-align-items-center">
                        <figure className="image is-96x96">
                        <img src={logoImg} className="is-rounderd" />
                        </figure>
                    </div>
                    <form className="mt-5" onSubmit={handleSearchSubmit}>
                        <div className="field">
                            <div className="control is-expanded">
                                <input type="text" placeholder="Search for a dinosaure by name" className="input is-medium" />
                            </div>
                        </div>
                        <div className="field mt-5 has-addons has-addons-centerd">
                            <div className="control">
                                <div className="buttons">
                                    <button className="button is-link is-outline is-rounded is-light" onClick={handleLuckeyClick}>I'm Feeling Luckey</button>
                                    <button className="button is-primary is-rounded is-outline is-light">Let's Search</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div> 
       </section>
    )
}

export default DinoSearch