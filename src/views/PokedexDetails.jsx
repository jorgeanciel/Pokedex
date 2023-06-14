import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const getPokemonId = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokedexDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const pokemon = await getPokemonId(id);
      setPokemon(pokemon);
    };

    if (!state?.pokemon) loadData();
    else setPokemon(state.pokemon);
  }, []);
  return (
    <div>
      {pokemon && (
        <div className="flex justify-center items-center gap-x-1 lg:gap-x-10">
          <div>
            {' '}
            <h1 className="text-4xl font-bold text-center">
              {pokemon.name.toUpperCase()}
            </h1>
            <div className="flex flex-row justify-center">
              <img
                src={pokemon?.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            {' '}
            {pokemon.stats.map((stat) => (
              <section key={stat.stat.name} className="flex items-center gap-1 lg:gap-10">
                <h3 className=" pl-2 pr-2 text-black-500 text-center text-xl lg:text-2xl ">
                  {stat.stat.name.toUpperCase()} :
                </h3>
                <p className="text-center font-bold text-rose-500 text-2xl">
                  {stat.base_stat}
                </p>
              </section>
            ))}{' '}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokedexDetails;
