import { createClient } from "@supabase/supabase-js";
import { PokemonClient } from "pokenode-ts";
import * as dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const insertData = async () => {
  const pokeApi = new PokemonClient();
  const pokemon = await pokeApi.listPokemons(0, 493);
  const pokeMap = pokemon.results.map((p, index) => ({
    id: index + 1,
    name: (p as { name: string }).name,
    votesFor: 0,
    votesAgainst: 0,
  }));
  const { error } = await supabase.from("pokemon").insert(pokeMap);
  console.error(error);
};

insertData();
