/*Parte 2*/ 
window.addEventListener("load", function(){
    function speciePokemon(){
        const urlParamentsDetail = new URLSearchParams(window.location.search)
        const pokeId = urlParamentsDetail.get('id')
        const url = `https://pokeapi.co/api/v2/pokemon-species/${pokeId}/`
        return fetch(url)
        .then((response)=>response.json())
        .then((jsonResponse)=> eggPoke(jsonResponse))
    }
    
    
    function eggPoke(eggDetail){
        const pokeEgg = new Pokemon()
        
        const eggs = eggDetail.egg_groups.map((eggSlot)=>eggSlot.name)
        const [egg , egg2] = eggs 

        pokeEgg.egg2 = egg2
        pokeEgg.egg = egg
        pokeEgg.eggs = eggs
        pokeEgg.gender = eggDetail.gender_rate

    
        return exibirCardEgg(pokeEgg)
    }
    
    
    function exibirCardEgg(pokemon){
        const eggContainer = document.getElementById('details-card-2')
    
        const detailsEgg = document.createElement('div')
        detailsEgg.classList.add('detailsEgg')
    
        detailsEgg.innerHTML = `
        <div class="content-details-2">
                            <h1>Breending</h1>
                            <ul>
                                <li>
                                    <p>Gender <p>${pokemon.gender}</p></p>
                                </li>
                                <li>
                                    <p>
                                        Egg Groups <p>${pokemon.egg}</p>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Egg Cycle   <p>${pokemon.egg2}</p>
                                    </p>
                                </li>
                            </ul>
                        </div>     
            `;
            eggContainer.appendChild(detailsEgg)
    }
    speciePokemon()
})


/*Parte 2*/ 