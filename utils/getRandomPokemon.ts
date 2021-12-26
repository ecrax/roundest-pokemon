const MAX_DEX_NUMBER = 493;

export const getRandomNumber = (notThis?: number) => {
  let r = Math.floor(Math.random() * MAX_DEX_NUMBER + 1);
  while (r == notThis) {
    r = Math.floor(Math.random() * MAX_DEX_NUMBER + 1);
  }
  return r;
};

export const getPokemonPair = () => {
  const pokemonID1 = getRandomNumber();
  const pokemonID2 = getRandomNumber(pokemonID1);

  return [pokemonID1, pokemonID2];
};
