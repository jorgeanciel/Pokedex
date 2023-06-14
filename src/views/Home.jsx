import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Home = () => {
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState('null');
  const { user, saveUser } = useContext(UserContext);

  const handleChange = (e) => {
    const newName = e.target.value;
    setNameValue(newName);
    if (newName === '') setNameError('escribe un nombre');
    else if (!/^[a-zA-Z]{5,}$/.test(newName))
      setNameError('solo se permiten letras, minimo 5');
    else setNameError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameError) saveUser(nameValue);
  };

  return (
    <div>
      <div className="flex justify-center">
        <img src="/pokedex3.webp" alt="Pokedex" />
      </div>
      <div className=" text-center pt-5">
        <h1 className="text-red-500 font-bold text-4xl">|Hello Entrenador|</h1>
        <p className="text-2xl pt-4">Type your name to start</p>
      </div>
      <form
        className="flex justify-center items-center mt-8 gap-1"
        onSubmit={handleSubmit}
      >
        <input
          className="border border-black shadow-lg p-3"
          type="text"
          value={nameValue}
          onChange={handleChange}
        />
        <button className="font-bold bg-red-600 p-3 text-white" type="submit">
          Start
        </button>
      </form>
      {nameError && <p className="text-red-500 text-center">{nameError}</p>}
      {user && <Navigate to="/pokedex" replace />}
    </div>
  );
};

export default Home;
