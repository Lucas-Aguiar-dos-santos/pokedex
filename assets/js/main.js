
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;
const limit = 10;
let offset = 0;

    function verDetalhes(pokeId){
        window.location.href = `detail.html?id=${pokeId}`
    }


    function loadPokemons(offset, limit){
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => { 
            const newHtml = pokemons.map((pokemon)=> `
            <li class="pokemon ${pokemon.type}" onclick="verDetalhes(${pokemon.number})">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type)=>`<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
            `).join('');
            pokemonList.innerHTML += newHtml
    })
    }

    loadPokemons(offset, limit)
    

    loadMoreButton.addEventListener('click', ()=>{
        offset += limit

        const qtdRecordsNextPage = offset + limit

        if(qtdRecordsNextPage >= maxRecords){
            const newLimit = maxRecords - offset
            loadPokemons(offset, newLimit);

            loadMoreButton.parentElement.removeChild(loadMoreButton)
        }else{
            loadPokemons(offset, limit)
        }

    })


    /*${pokemon.abilities.map((ability)=>`<p>${ability}</p>`).join('')}*/