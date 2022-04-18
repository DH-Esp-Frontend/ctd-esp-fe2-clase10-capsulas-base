import React, { useEffect, useState } from "react";
import Tarjeta from "./components/Tarjeta";
import "./App.css";
import { API_URL_BASE, API_URL_POKEMON } from "./constantes";

interface IPokemonBase {
  name: string;
  url: string;
}

interface IPokemonDetallado {
  id: number;
  nombre: string;
  imagen: string;
}

// Aca se esta dividiendo la lógica de obtener los datos de la API en varias funciónes
// para ejemplificar la aplicación de SRP.
// Estas funciones podrian encontrarse en un archivo separado al componente como
// utils o providers. Lo dejé acá para que sea más sencillo de entender.

const obtenerNumeroAleatorio = (min: number = 0, max: number = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const obtenerListadoPokemons = async (
  offset: number,
  limit: number,
  signal: AbortSignal
) => {
  const response = await fetch(
    `${API_URL_BASE}${API_URL_POKEMON}?offset=${offset}&limit=${limit}`,
    {
      signal,
    }
  );
  const data = await response.json();
  return data.results;
};

const obtenerDetallePokemons = async (pokemons: IPokemonBase[]) => {
  const pokemonsConDetalle = await Promise.all(
    pokemons.map(async (pokemon) => {
      const dataPokemon = await fetch(pokemon.url);
      const pokemonData = await dataPokemon.json();

      return {
        id: pokemonData.id,
        nombre: pokemonData.name,
        imagen: pokemonData.sprites.front_default,
      };
    })
  );

  return pokemonsConDetalle;
};

const obtenerPokemons = async (signal: AbortSignal) => {
  const offset = obtenerNumeroAleatorio();

  const pokemons = await obtenerListadoPokemons(offset, 8, signal);

  const pokemonsConDetalle = await obtenerDetallePokemons(pokemons);

  return pokemonsConDetalle;
};

function App() {
  const [pokemons, setPokemons] = useState<IPokemonDetallado[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const cargarPokemons = async () => {
      const pokemons = await obtenerPokemons(abortController.signal);

      setPokemons(pokemons);
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
