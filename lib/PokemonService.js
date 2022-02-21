const pokeData = require('../data/pokemon.json');

const pokemonService = {
    getAllPokemon: () => {
        return pokeData;
    }

};

module.exports = pokemonService;