import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuSword } from 'react-icons/lu';
import { IoShieldOutline } from 'react-icons/io5';
import { GiLifeBar } from 'react-icons/gi';
import { LuSwords } from 'react-icons/lu';
import { FaShieldHeart } from 'react-icons/fa6';
import { FaPersonRunning } from 'react-icons/fa6';
import ColorName from './colorData/ColorName';
import BGColor from './colorData/BgColor';

const getPokemonId = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData, type }) => {
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
          className="hover:cursor-pointer   border-solid border-4  bg-white rounded-lg max-w-[230px]"
          style={{ borderColor: ColorName(pokemon.types[0].type.name) }}
        >
          <section>
            <section className="text-center pb-2 pt-2">
              <h2
                className="text-2xl font-semibold"
                style={{ color: ColorName(pokemon.types[0].type.name) }}
              >
                {pokemon.name.toUpperCase()}
              </h2>
            </section>

            <section
              className="flex justify-center"
              style={{ background: BGColor[pokemon.types[0].type.name] }}
            >
              <div className="m-auto h-[100px] p-2">
                <img
                  className=" h-full"
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={pokemon.name}
                />
              </div>
            </section>
            <section className=" flex gap-3 flex-wrap justify-center">
              <div className="flex flex-col gap-0 min-w-full">
                <p className="bg-red-500 text-center text-white tracking-widest font-bold">
                  Type
                </p>
                <p className="text-yellow-400 font-bold text-center bg-black">
                  {pokemon.types[0].type.name.toUpperCase()}
                </p>
              </div>
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name} className="p-0">
                  <div>
                    {stat.stat.name === 'attack' && <LuSword />}
                    {stat.stat.name === 'defense' && <IoShieldOutline />}
                    {stat.stat.name === 'hp' && <GiLifeBar />}
                    {stat.stat.name === 'special-attack' && <LuSwords />}
                    {stat.stat.name === 'special-defense' && <FaShieldHeart />}
                    {stat.stat.name === 'speed' && <FaPersonRunning />}
                  </div>
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
