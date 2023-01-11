import React, { useEffect,useState } from 'react';
import { getPokemans,getAPokeman } from './Services/pokemon.js'
import Entry from './Components/Entry.js'
import Nav from './Components/Nav.js'
import './App.css';

function App() {
  const [pokeData, setPokeData]=useState([]);
  const [nextUrl,setNextUrl]=useState ('');
  const [prevUrl,setPrevUrl]=useState('');
  const [waitload,setWaitload]=useState(true);
  const initialUrl ='https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    async function fetchPokedata() {
      let response = await getPokemans(initialUrl);
      setPrevUrl(response.previous);
      setNextUrl(response.next);
      await loadPokemans(response.results);
      setWaitload(false);
    }
    fetchPokedata();
  }, [])

const next = async () => {
  setWaitload(true);
  let data= await getPokemans(nextUrl)
  await loadPokemans(data.results)
  setNextUrl(data.next);
  setPrevUrl(data.previous);
  setWaitload(false);
}

const prev = async () => {
  if (!prevUrl) return;
  setWaitload(true);
  let data= await getPokemans(prevUrl)
  await loadPokemans(data.results)
  setNextUrl(data.next);
  setPrevUrl(data.previous);
  setWaitload(false);
}

  const loadPokemans = async (data) => {
    let _pokemansData = await Promise.all(data.map(async pokemon => {
      let PokemansIndex = await getAPokeman(pokemon.url);
      return PokemansIndex;
    })
    );

    setPokeData(_pokemansData);
  };

  
  return (
    <div>{ waitload ? (<h1>Waiting for Pokemon to appear...</h1>) : (
    <>
      <Nav />
      <div className="button">
        <button onClick={prev}>Previous</button>
        <button onClick={next}>Next</button>
      </div>
      <div className="grid-container">
        {pokeData.map((pokemon, i) => {
          return <Entry key={i} pokemon={pokemon}/>
        })}
      </div>
      <div className='button'>
        <button onClick={prev}>Previous</button>
        <button onClick={next}>Next</button>
    </div>
    </>
    )}
    </div>
  );    
}

export default App;
