import { showError, showPositionMap } from './data/geo.js';
import weather from './data/weather.js';
import content from "./data/content.js";
import capitals from "./data/capitals.js";

const add = document.querySelector('#add');
const addCity = document.querySelector('#addCity');
const formAddCity = document.querySelector('form');
const center = document.querySelector('.center');
const ul = document.querySelector('ul');

const getWeather = city => { // função que põe em display a cidade adicionada à localStorage
    weather(city)
        .then ( weatherData => {
            const newCity = document.createElement('div');
            newCity.classList.add('gradient-border','current');
            newCity.setAttribute('id',city);
            newCity.innerHTML = content(weatherData) + `<div id="close">X</div>`;
            document.querySelector('.center').insertBefore(newCity,add);
        })
        .catch ( err => {
            console.log('Promise com erro',err.message);
        });
}

capitals()
    .then( dataCapitals => {
        let liCapital = '';
        dataCapitals.forEach( capital => {
            liCapital += `<li id='${capital.capital[0]}'>${capital.capital[0]}</li>`
        })
        ul.innerHTML = liCapital;
        const items = document.querySelectorAll('ul li'); // pega em todas as capitais
        items.forEach( element => { // para cada item desta query, corremo-los
            element.draggable = true; // definir que podem ser arrastados
            element.ondragstart = e => e.dataTransfer.setData('item-id',e.target.id) // quando começa a arrastar, há um evento com uma função associada (callback function), vai definir uma variável 'item-id' para apanhar o valor do id do elemento que estiver a ser arrastado (dataTransfer) e vai definir este valor no e.target.id
        });

        const dropzone = document.querySelector('[dropzone]');
        dropzone.ondragover = e => e.preventDefault(); // quando o dragover acaba, retira o evento predefinido
        dropzone.ondrop = e => { // quando se larga o elemento
            const id = e.dataTransfer.getData('item-id'); // lê o valor do id
            getWeather(id); // executa a função para mostrar o tempo
            cities.push(id); // adiciona o novo value para a array de cities
            localStorage.setItem('cities',JSON.stringify(cities)); // adiciona o novo value à localStorage
        };
    })
    .catch ( err => {
        console.log('Promise com erro',err.message);
    })

let cities = [];
cities = JSON.parse(localStorage.getItem('cities')); // vai buscar a informação de cities que está na localStorage e aplica-a à variável cities

if (cities != null) { // caso o array de cities não seja null (por não existir na localStorage)
    cities.forEach( city => {
        getWeather(city);
    });
} else {
    cities = [];
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPositionMap, showError);
} else {
    x.innerHTML = "Geolocation is not supported by this browser.";
}

add.addEventListener('click', e => {
    addCity.classList.remove('hide');
});

window.addEventListener('keydown', e => {
    if (e.key == 'Escape') {
        addCity.classList.add('hide');
    }
});

formAddCity.addEventListener('submit', e => {
    e.preventDefault();
    addCity.classList.add('hide'); // ao fazer submit, volta a esconder o input
    cities.push(formAddCity.city.value.trim()); // adiciona o novo value para a array de cities
    localStorage.setItem('cities',JSON.stringify(cities)); // adiciona o novo value à localStorage
    getWeather(formAddCity.city.value.trim());
    // console.log(formAddCity.city.value.trim());
    formAddCity.reset(); // limpa a caixa de texto depois de a esconder
});

center.addEventListener('click', e => {
    if (e.target.getAttribute('id') === 'close') {
        const idCity = e.target.parentElement.getAttribute('id'); // apanha o valor do id do elemento pai (é o valor que foi introduzido no formulário ao adicionar)
        // console.log(idCity);
        cities = cities.filter( city => city != idCity); // filtra as cidades em que a array passa a ser tudo o que não tem o id da cidade a remover
        localStorage.setItem('cities',JSON.stringify(cities)); // aplica esta alteração ao localStorage
        // console.log('após',todoList);
        e.target.parentElement.remove(); // vai para o parent element (neste caso, o div com class current) e remove-o
    }
});