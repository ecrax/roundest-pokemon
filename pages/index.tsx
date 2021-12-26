import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { PokemonClient } from "pokenode-ts";

const MAX_DEX_NUMBER = 493;

const getRandomNumber = (notThis?: number) => {
  let r = Math.floor(Math.random() * MAX_DEX_NUMBER + 1);
  while (r == notThis) {
    r = Math.floor(Math.random() * MAX_DEX_NUMBER + 1);
  }
  return r
};

const Home: NextPage = ()  => {
  const pokemonID1 = getRandomNumber();
  const pokemonID2 = getRandomNumber(pokemonID1);


  const pokeApi = new PokemonClient();
  const pokemon1 =  pokeApi.getPokemonById(pokemonID1);
  const pokemon2 = pokeApi.getPokemonById(pokemonID2);

  return (
    <div>
      <Head>
        <title>Roundest Pokemon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl text-center">Which Pokemon is Rounder?</h1>

        <div className="border flex justify-center items-center">
          <div className="flex-col pb-2">
            <div className="pt-2">{pokemonID1}</div>
            <div className="p-2" />
            <button className="bg-white text-black font-bold py-2 px-4 rounded-full">
              Rounder
            </button>
          </div>
          <div className="px-8">or</div>
          <div className="flex-col pb-2">
            <div className="pt-2">{pokemonID2}</div>
            <div className="p-2" />
            <button className="bg-white text-black font-bold py-2 px-4 rounded-full">
              Rounder
            </button>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      data: null,
    },
  };
};

export default Home;
