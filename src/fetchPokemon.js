import fetch from 'node-fetch';
import {promises as fsPromises} from 'fs';


const limit = '15';

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`)
   .then(response => response.json())
   .then(data => {
        fsPromises.writeFile("./pokedata.json", JSON.stringify(data))
   })
   .catch(error => console.error(error));   