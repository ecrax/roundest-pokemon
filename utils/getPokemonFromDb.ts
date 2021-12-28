import { getPokemonPair } from "./getRandomPokemon";
import { supabase } from "./initSupabase";

export const getPokemonFromDb = async () => {
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
      firstPokemon: dataOne[0],
      secondPokemon: dataTwo[0],
    };
}