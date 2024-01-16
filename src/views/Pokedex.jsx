import React, { useContext, useEffect, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/usePagination';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { getAllPokemons } from '../services/getAllPokemons';

const Pokedex = () => {
  const { pokemons, types, name, type } = useLoaderData();
  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonsType, setPokemonsType] = useState(type ?? '');

  const pokemonsPagination = usePagination(pokemons, 10);

  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setPokemonsType(e.target.value);
  };

  const firstUpperCase = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  useEffect(() => {
    setPokemonName(name);
  }, [name]);

  useEffect(() => {
    setPokemonsType(type);
  }, [type]);

  return (
    <div className="w-full p-5 bg-gray-500">
      <div>
        <Form className="flex justify-center items-center">
          <h3 className="text-red-600 pr-5 text-2xl font-extrabold hidden sm:block">
            Filter for search
          </h3>
          <div className="flex flex-row justify-center gap-2">
            <div className="flex flex-row gap-3">
              <input
                type="text"
                name="pokemon_name"
                className="shadow-md border border-black rounded-lg"
                value={pokemonName}
                onChange={handleNameChange}
              />
              <select
                name="pokemon_type"
                value={pokemonsType}
                onChange={handleTypeChange}
                className="rounded-lg  border-yellow-500 border-4"
              >
                <option value="all-types">--All-types--</option>
                {types.map((type) => (
                  <option key={type.url} value={type.name} className="text-yellow-500">
                    {firstUpperCase(type.name)}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="bg-red-500 text-white p-2 hover:bg-red-400 rounded-lg"
              type="submit"
            >
              Search
            </button>
          </div>
        </Form>
      </div>

      <section className="flex justify-center gap-12 flex-wrap pt-10 ">
        {pokemonsPagination.listSlice.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonData={pokemon} />
        ))}
      </section>
      <div className="flex flex-row gap-4 justify-center m-5 text-2xl">
        <button
          onClick={() => pokemonsPagination.previousPage()}
          className="bg-red-500 px-4 py-1 rounded-lg"
        >
          <FaArrowLeft />
        </button>
        <input
          type="text"
          value={pokemonsPagination.currentPage}
          className="w-16 text-center rounded-lg"
        />
        <button
          onClick={() => pokemonsPagination.nextPage()}
          className="bg-red-500 px-4 py-1 rounded-lg"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
