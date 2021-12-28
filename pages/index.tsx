import { supabase } from "@utils/initSupabase";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getPokemonFromDb } from "@utils/getPokemonFromDb";
import { useState } from "react";
import { isFloat32Array } from "util/types";

const Home: NextPage<{ pokemonPair: any }> = (props) => {
  const [pokemonPair, setPokemonPair] = useState(props.pokemonPair);
  const [isLoading, setIsLoading] = useState(false);

  const vote = async (id: number) => {
    if (!id) return;

    if (id == pokemonPair.firstPokemon.id) {
      const { error } = await supabase.rpc("incrementvotesfor", {
        x: 1,
        row_id: pokemonPair.firstPokemon.id,
      });
      if (error) console.error(error);

      const { error: error2 } = await supabase.rpc("incrementvotesagainst", {
        x: 1,
        row_id: pokemonPair.secondPokemon.id,
      });
      if (error2) console.error(error2);
    } else {
      const { error } = await supabase.rpc("incrementvotesfor", {
        x: 1,
        row_id: pokemonPair.secondPokemon.id,
      });
      if (error) console.error(error);

      const { error: error2 } = await supabase.rpc("incrementvotesagainst", {
        x: 1,
        row_id: pokemonPair.firstPokemon.id,
      });
      if (error2) console.error(error2);
    }
    setIsLoading(true);
    setPokemonPair(await getPokemonFromDb());
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Head>
        <title>Roundest Pokemon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-between">
        <h1 className="text-4xl text-center">Which Pokemon is Rounder?</h1>
        <div className="p-8" />
        <div className="flex justify-center items-center">
          <PokemonCard pokemon={pokemonPair.firstPokemon} vote={vote} disabled={isLoading} />

          <div className="px-16 italic">or</div>
          <PokemonCard pokemon={pokemonPair.secondPokemon} vote={vote} disabled={isLoading} />
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

const PokemonCard: React.FC<{
  vote: Function;
  pokemon: { name: string; spriteUrl: string; id: number } | undefined;
  disabled: boolean;
}> = (props) => {
  return (
    <div
      className={`flex-col pb-2 justify-items-center flex items-center transition-opacity ${
        props.disabled && "opacity-0"
      }`}
    >
      <div className="pt-2 capitalize text-center">{props.pokemon?.name}</div>
      <div className="p-2" />
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon?.id}.png`}
        width={256}
        height={256}
        alt="Pokemon Image"
        className="animate-fade-in"
      />
      <div className="p-2" />
      <button
        onClick={() => {
          props.vote(props.pokemon?.id);
        }}
        className="bg-white text-black font-bold py-2 px-4 rounded-full"
        disabled={props.disabled}
      >
        This one
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const pokemonPair = await getPokemonFromDb();
  return {
    props: {
      pokemonPair: pokemonPair,
    },
  };
};

export default Home;
