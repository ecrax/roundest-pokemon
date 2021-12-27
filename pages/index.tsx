import { supabase } from "@utils/initSupabase";
import { trpc } from "@utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  const {
    data: pokemonPair,
    refetch,
    isLoading,
    error
  } = trpc.useQuery(["getPokemonPair"], {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  console.log(error);
  

  if (isLoading || !pokemonPair) return <div>Loading...</div>;

  const vote = async (id: number) => {
    
    console.log(error);
    
    if(!id) {
      console.log("no id passed");
      
      return;
    } 
    
    
    //console.log(id);
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

    refetch();
  };

  console.log("Pokemon Pair",pokemonPair);
  

  return (
    <div>
      <Head>
        <title>Roundest Pokemon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl text-center">Which Pokemon is Rounder?</h1>

        <div className="flex justify-center items-center">
          <PokemonCard pokemon={pokemonPair.firstPokemon} vote={vote} />

          <div className="px-8 italic">or</div>
          <PokemonCard pokemon={pokemonPair.secondPokemon} vote={vote} />
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

const PokemonCard: React.FC<{
  vote: Function;
  pokemon: { name: string; spriteUrl: string; id: number; } | undefined;
}> = (props) => {
  
  return (
    <div className="flex-col pb-2 justify-items-center flex items-center">
      <div className="pt-2 capitalize text-center">{props.pokemon?.name}</div>
      <div className="p-2" />
      <Image src={props.pokemon?.spriteUrl!} width={256} height={256} />
      <div className="p-2" />
      <button
        onClick={() => {
          props.vote(props.pokemon?.id);
        }}
        className="bg-white text-black font-bold py-2 px-4 rounded-full"
      >
        Rounder
      </button>
    </div>
  );
};

export default Home;
