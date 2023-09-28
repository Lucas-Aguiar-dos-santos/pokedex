const pokeDetailApi = {};
/*Parte 1*/ 
function DetailPoke(){
    const urlParaments = new URLSearchParams(window.location.search)
    const pokemonId = urlParaments.get('id');
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    return fetch(url)
        .then((response)=>response.json())   
        .then((jsonBody)=>detailPokePage(jsonBody))


}


function detailPokePage(detailPoke){
    const pokemonDet = new Pokemon()

    pokemonDet.name = detailPoke.name
    pokemonDet.number = detailPoke.id
    pokemonDet.height = detailPoke.height
    pokemonDet.weight = detailPoke.weight
    pokemonDet.stats = detailPoke.stats

    pokemonDet.photo = detailPoke.sprites.other.dream_world.front_default 

    const abilities = detailPoke.abilities.map((abilitiSlot) => abilitiSlot.ability.name)
    const [ability] = abilities

    pokemonDet.abilities = abilities;
    pokemonDet.ability = ability;

    const types = detailPoke.types.map((typesSlot)=>typesSlot.type.name) 
    const [type] = types   

    const stats = detailPoke.stats.map((statSlot) => [statSlot.stat.name, statSlot.base_stat])

    pokemonDet.types = types
    pokemonDet.type = type
    pokemonDet.stats = stats

    const species = detailPoke.species.name
    pokemonDet.species = species

    


    return exibirDetails(pokemonDet)
}


function exibirDetails(pokemon){
    const detailsContainer = document.getElementById('card_list')

    const detalhes = document.createElement('div')
    detalhes.classList.add('detalhes')

    detalhes.innerHTML = `
    <div  class="content  ${pokemon.type}">
        <div class="part-1">
            <div class="conteiner-part-1">
                <nav class="nav">
                    <a href="index.html"><img src="./assets/image/arrow-left.svg" alt=""></a>
                    <img src="/assets/image/heart.svg" alt="">
                </nav>
                <div class="pokemon-info">
                    <div class="name">
                        <h1>${pokemon.name}</h1>
                        <ol class="types">
                            ${pokemon.types.map((type)=>`<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="number">
                        <p>#${pokemon.number}</p>
                    </div>
                </div>
                <div class="img-pokemon">
                    <img src="${pokemon.photo}" alt="">
                </div>
            </div>
        </div>
        <div class="part-2">
            <div class="wraper-pokemon">
                <div class="nav-wraper">
                    <div class="about active">
                        <button type="button">About</button>
                    </div>
                    <div class="base_stats">
                        <button type="button">Base Stats</button>
                    </div>
                    <div class="evolution">
                        <button type="button">Evolution</button>
                    </div>
                    <div class="moves">
                        <button type="button">Moves</button>
                    </div>
                </div>
                <div class="card_details_1">
                    <ul>
                        <li>
                            <p>
                                species: <p>${pokemon.species}</p>
                            </p>    
                        </li>
                        <li>
                            <p>
                                Height: <p>${pokemon.height}</p>
                            </p>
                        </li>
                        <li>
                            <p>
                                weight: <p>${pokemon.weight}</p>
                            </p>
                        </li>
                        <li>
                            <p>
                                Abilities: ${pokemon.abilities.map((ability)=>`<p>${ability}</p>`).join('')}
                            </p>

                        </li>
                    </ul>
                </div>
                <div id="details-card-2" class="card_details_2">
                    
                </div>
            </div>  
        </div>
    </div>
    `;
    detailsContainer.appendChild(detalhes);
}

/*Parte 1*/ 

DetailPoke()
