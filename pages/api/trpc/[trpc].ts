import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getPokemonPair } from "@utils/getRandomPokemon";
import { PokemonClient } from "pokenode-ts";
import { z } from "zod";

const appRouter = trpc.router().query("getPokemonPair", {
  async resolve({ input }) {
    const pokeApi = new PokemonClient();
    const [id1, id2] = getPokemonPair();
    const pokemon1 = await pokeApi.getPokemonById(id1);
    const pokemon2 = await pokeApi.getPokemonById(id2);
    return {
      firstPokemon: pokemon1,
      secondPokemon: pokemon2,
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
