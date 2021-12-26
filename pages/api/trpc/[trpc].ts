import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getPokemonPair } from "@utils/getRandomPokemon";
import { PokemonClient } from "pokenode-ts";
import { z } from "zod";

const appRouter = trpc.router().query("getPokemonPair", {
  async resolve({ input }) {
    //console.log("I am fast");
    
    //TODO: fetch data from own servers
    const pokeApi = new PokemonClient();
    const [id1, id2] = getPokemonPair();
    const pokemon1 = await pokeApi.getPokemonById(id1);
    const pokemon2 = await pokeApi.getPokemonById(id2);
    //console.log("I am slow");
    
    return {
      firstPokemon: {
        name: pokemon1.name,
        spriteUrl: pokemon1.sprites.front_default!
      },
      secondPokemon: {
        name: pokemon2.name,
        spriteUrl: pokemon2.sprites.front_default!
      },
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
