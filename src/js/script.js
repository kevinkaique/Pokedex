const pokemonImage = document.querySelector(".pokemon__image");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;



//CONECTAR E CAPTURAR AS INFORMAÇÕES DA POKEAPI

const fetchpokemon = async(pokemon) => {

    pokemonName.textContent = "Loading...";
    pokemonNumber.textContent = "😞";
    pokemonImage.src = "https://c.tenor.com/fSsxftCb8w0AAAAi/pikachu-running.gif"
    
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIresponse.status === 200) {
        
    
        const data = await APIresponse.json();
    
        return data;
    }
   



};


const renderpokemon = async (pokemon) => {

    const data = await fetchpokemon(pokemon);

    console.log(data);

    if (data) {
        //caso tudo de certo

        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default
        pokemonImage.style.width = "17%";
        pokemonNumber.textContent = data.id;
        pokemonName.textContent = data.name;
        input.value = "";
        searchPokemon = data.id;
      
    } else {
        //caso de errado
        pokemonImage.src = "https://media.tenor.com/03NZAgvjSZkAAAAi/dance-pokemon.gif" 
        pokemonImage.style.width = "30%";
        pokemonNumber.textContent = "";
        pokemonName.textContent = "Not found :(";
    }


};


form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderpokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
    
    if (searchPokemon > 1) {
        
        searchPokemon -= 1 ;    
        renderpokemon(searchPokemon);
    }

});

buttonNext.addEventListener('click', () => {
  
    searchPokemon += 1 ;

    renderpokemon(searchPokemon);

});

renderpokemon(1)