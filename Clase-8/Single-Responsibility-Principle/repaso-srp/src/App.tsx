import React, { useEffect, useState } from "react";
import Tarjeta from "./components/Tarjeta";
import "./App.css";

interface IPokemonBase {
  name: string;
  url: string;
}

interface IPokemonDetallado {
  id: number;
  nombre: string;
  imagen: string;
}

// Esta aplicaciòn obtiene la informaciòn de los pokemones de la API de pokeapi.co
// y los muestra en una galeria de tarjetas.
// Como puede verse, la lógica para obtener los datos de los pokemones está dentro del mismo componente.
// La propuesta es refactorizar el código para que siga el principio de single responsibility.

function App() {
  const [pokemons, setPokemons] = useState<IPokemonDetallado[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const cargarPokemons = async () => {
      const offset = Math.floor(Math.random() * 100);
      const data = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=8`,
        {
          signal: abortController.signal,
        }
      );
      const pokemons = await data.json();

      const pokemonsConDetalle = Promise.all(
        pokemons.results.map(async (pokemon: IPokemonBase) => {
          const dataPokemon = await fetch(pokemon.url);
          const pokemonData = await dataPokemon.json();

          return {
            id: pokemonData.id,
            nombre: pokemonData.name,
            imagen: pokemonData.sprites.front_default,
          };
        })
      );

      setPokemons(await pokemonsConDetalle);
    };

    cargarPokemons();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Galeria de pokemones</h1>
      </header>
      <div className="contenedor-tarjetas">
        {pokemons.map((pokemon) => (
          <Tarjeta
            titulo={pokemon.nombre}
            imagen={pokemon.imagen}
            key={pokemon.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
