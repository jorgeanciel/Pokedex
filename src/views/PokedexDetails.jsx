import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import BGColor from '../components/colorData/BgColor';

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
    <>
      {pokemon && (
        <div
          className="flex justify-center gap-x-1 lg:gap-x-10  h-[100vh] "
          style={{ background: BGColor[pokemon.types[0].type.name] }}
        >
          <div className="bg-white p-2 m-5 rounded-lg">
            <div className="m-auto p-2">
              <h1 className="text-4xl font-bold text-center">
                {pokemon.name.toUpperCase()}
              </h1>
            </div>
            <div className="flex flex-row ">
              <div className="flex flex-row justify-center h-[500px]">
                <img
                  src={pokemon?.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  className="h-full"
                />
              </div>
              <div className="flex flex-col justify-center ">
                {pokemon.stats.map((stat) => (
                  <section
                    key={stat.stat.name}
                    className="flex items-center gap-1 lg:gap-10 p-2"
                  >
                    <h3 className=" pl-2 pr-2 text-black-500 text-center text-xl lg:text-2xl ">
                      {stat.stat.name.toUpperCase()} :
                    </h3>
                    <p className="text-center font-bold text-rose-500 text-2xl">
                      {stat.base_stat}
                    </p>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokedexDetails;
