const pokeApi = {}

function convertPokemonDetail(pokedetail){
    const pokemon = new Pokemon()
        pokemon.number = pokedetail.id
        pokemon.name = pokedetail.name

        const types = pokedetail.types.map((typeSlot) => typeSlot.type.name)
        const [type] = types

        pokemon.types = types;
        pokemon.type = type

        /*const abilities = pokedetail.abilities.map((abilitiSlot) => abilitiSlot.ability.name)
        const [ability] = types

        pokemon.abilities = abilities;
        pokemon.ability = ability;*/

        pokemon.photo = pokedetail.sprites.other.dream_world.front_default 

        return pokemon
}


pokeApi.getPokemonsDetail = (pokemon) =>{
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokemonDetail)
}   

pokeApi.getDetailPokemons = (pokemon)=>{
    return fetch(pokemon.url)
            .then((response)=>response.json())
            .then(detailPokePage)
}



pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonbody) => jsonbody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequest)=> Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails)
}