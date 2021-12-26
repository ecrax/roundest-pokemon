import { trpc } from "@utils/trpc";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  const [pokemonPair, setPokemonPair] = useState(
    trpc.useQuery(["getPokemonPair"])
  );
  if (pokemonPair.isLoading  || !pokemonPair.data) return <div>Loading...</div>;

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
            <div className="pt-2 capitalize">
              {pokemonPair.data.firstPokemon.name}
            </div>
            <div className="p-2" />
            <button
              onClick={async () => setPokemonPair(await pokemonPair.refetch())}
              className="bg-white text-black font-bold py-2 px-4 rounded-full"
            >
              Rounder
            </button>
          </div>
          <div className="px-8">or</div>
          <div className="flex-col pb-2">
            <div className="pt-2 capitalize">
              {pokemonPair.data.secondPokemon.name}
            </div>
            <div className="p-2" />
            <button
              onClick={async () => setPokemonPair(await pokemonPair.refetch())}
              className="bg-white text-black font-bold py-2 px-4 rounded-full"
            >
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
