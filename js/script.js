
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const pokemonId = document.querySelector('.idPokemon');
const pokemonName = document.querySelector(".nomePokemon");
const pokemonImage = document.querySelector('.pokemonImage');
const tipos = document.querySelector('.types');
const stats = document.querySelectorAll('.stats');
const barra1 = document.querySelectorAll('.barra1');
const ppStats = document.querySelectorAll('.pp');

const botaoPv = document.querySelector('.btn-voltar');
const botaoVt = document.querySelector('.btn-passar');
const container = document.querySelector('.container');


const typeColors = {
    dragon: [241, 110, 87],
    normal: [164, 172, 175],
    fire: [253, 125, 36],
    water: [69, 146, 196],
    grass: [155, 204, 85],
    ice: [81, 196, 231],
    electric: [246, 250, 83],
    fighting: [185, 127, 201],
    poison: [172, 46, 206],
    ground: [138, 129, 89],
    flying: [138, 115, 109],
    psychic: [243, 102, 185],
    bug: [114, 159, 63],
    rock: [163, 140, 30],
    ghost: [123, 98, 163],
    dark: [112, 112, 112],
    steel: [158, 183, 184],
    fairy: [253, 185, 233]
}

let primeiroPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (response.status === 200) {
        const data = await response.json();
        return data;
    }
}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonId.innerHTML = '';

    const data = await fetchPokemon(pokemon);


    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = `#${data.id.toString().padStart(2, "0")}`;
        pokemonImage.src = data['sprites']['other']['official-artwork']['front_default'];
        input.value = '';
        tipos.innerHTML = "";
        primeiroPokemon = data.id;

        data.types.forEach((t) => {
        tipos.style.display = 'block';

            let novoTipo = document.createElement('button');
            novoTipo.innerHTML = t.type.name;
            novoTipo.classList.add(`type`);
            tipos.appendChild(novoTipo);
            novoTipo.style.backgroundColor =
                `rgb(${typeColors[t.type.name][0]},
                ${typeColors[t.type.name][1]},
                ${typeColors[t.type.name][2]})`
                
        });

        const barraColor = typeColors[data.types[0].type.name];

        container.style.backgroundColor = 
         `rgba(${barraColor[0]},${barraColor[1]},${barraColor[2]},.3)`;

        data.stats.forEach((s, i) => {
            ppStats[i].innerHTML = s.base_stat;
            barra1[i].style.width = `${s.base_stat}%`;
            barra1[i].style.backgroundColor =
                `rgba(${barraColor[0]},${barraColor[1]},${barraColor[2]})`;
        });


    } else {
        pokemonName.innerHTML = 'Not fund :c';
        pokemonId.innerHTML = '';
        pokemonImage.style.display = 'none';
        tipos.style.display = 'none';
        input.value = "";
        
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});
botaoPv.addEventListener('click', () => {
    if(primeiroPokemon > 1){
        primeiroPokemon--
        renderPokemon(primeiroPokemon);
    }
});
botaoVt.addEventListener('click', () => {
    primeiroPokemon++;
    renderPokemon(primeiroPokemon);
});

renderPokemon(primeiroPokemon);


