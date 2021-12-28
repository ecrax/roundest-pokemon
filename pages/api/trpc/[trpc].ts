import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getPokemonPair } from "@utils/getRandomPokemon";
import { supabase } from "@utils/initSupabase";
import { z } from "zod";

interface Pokemon {
  name: string;
  spriteUrl: string;
  id: number;
}

const appRouter = trpc.router().query("getPokemonPair", {
  async resolve({ input }) {

    const [id1, id2] = getPokemonPair();    
    const {error: errorOne, data: dataOne } = await supabase
      .from("pokemon")
      .select("id, name")
      .eq("id", id1);
    const { error: errorTwo, data: dataTwo } = await supabase
      .from("pokemon")
      .select("id, name")
      .eq("id", id2);

    if(errorOne) console.error(errorOne);
    if(errorTwo) console.error(errorTwo);

    if (!dataOne || !dataTwo){
      throw new Error("No data received");
    }    

    return {
      firstPokemon: dataOne?.at(0),
      secondPokemon: dataTwo?.at(0),
    };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
