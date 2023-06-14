import React, { useContext, useEffect, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';

import { usePagination } from '../hooks/usePagination';

const Pokedex = () => {
  const { pokemons, types, name, type } = useLoaderData();
  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonsType, setPokemonsType] = useState(type ?? '');

  const pokemonsPagination = usePagination(pokemons, 50);

  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setPokemonsType(e.target.value);
  };

  useEffect(() => {
    setPokemonName(name);
  }, [name]);

  useEffect(() => {
    setPokemonsType(type);
  }, [type]);

  return (
    <div className="w-full p-5 bg-gray-500">
      <div className="flex flex-row gap-4 justify-center m-5 text-2xl">
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={pokemonsPagination.currentPage === page ? 'text-red-500' : ''}
          >
            {page}
          </button>
        ))}
      </div>

      <div>
        <Form className="flex justify-center items-center">
          <h3 className="text-red-600 pr-5 text-2xl font-extrabold hidden sm:block">
            Filter for search
          </h3>
          <div className="flex flex-row justify-center">
            <div className="flex flex-row gap-3">
              <input
                type="text"
                name="pokemon_name"
                className="shadow-md border border-black"
                value={pokemonName}
                onChange={handleNameChange}
              />
              <select
                name="pokemon_type"
                value={pokemonsType}
                onChange={handleTypeChange}
              >
                <option value="" disabled>
                  --choose a type--
                </option>
                {types.map((type) => (
                  <option key={type.url} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="bg-red-500 text-white p-2 hover:bg-red-400 rounded"
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
    </div>
  );
};

export default Pokedex;
