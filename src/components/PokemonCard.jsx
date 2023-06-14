import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getPokemonId = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } });
  };

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemonInfo = await getPokemonId(pokemonData.url);
      setPokemon(pokemonInfo);
    };
    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article
          onClick={handleClickNavigate}
          className="hover:cursor-pointer max-w-xs border border-solid border-black  bg-white rounded-lg"
        >
          <section>
            <section className="text-center pb-6 pt-6">
              <h2 className="text-2xl font-semibold text-red-500">
                {pokemon.name.toUpperCase()}
              </h2>
            </section>

            <section className="flex justify-center align self-center">
              <div style={{ width: 200, height: 250 }}>
                <img
                  className="w-60"
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={pokemon.name}
                />
              </div>
            </section>

            <section className="pt-6 flex gap-3 flex-wrap justify-center">
              <div className="flex flex-col pt-2 gap-0 min-w-full">
                <p className="bg-red-500 text-center text-white tracking-widest font-bold">
                  Type
                </p>
                <p className="text-yellow-400 font-bold text-center bg-black">
                  {pokemon.types[0].type.name.toUpperCase()}
                </p>
              </div>
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name} className="p-0">
                  <h3 className="bg-amber-300 pl-2 pr-2 text-rose-500">
                    {stat.stat.name.toUpperCase()}
                  </h3>
                  <p className="text-center font-bold text-rose-500">{stat.base_stat}</p>
                </section>
              ))}
            </section>
          </section>
        </article>
      )}
    </>
  );
};

export default PokemonCard;
