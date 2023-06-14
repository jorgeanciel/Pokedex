import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import { UserContext } from '../contexts/UserContext';

const PokedexLayout = () => {
  const { removeUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  return (
    <div className="">
      <div className="flex relative">
        <img className="min-w-full h-52" src="./banner-pokemon.jpg" alt="" />

        <button
          className="bg-red-500 text-white p-2 hover:bg-red-400 rounded absolute"
          onClick={removeUser}
        >
          Log out
        </button>
        <p className="text-3xl absolute mt-16 sm:min-w-full w-40">
          <span className="text-amber-500 font-bold">Bienvenido {user}</span> ..... atrapa
          tu pokemon
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default PokedexLayout;
