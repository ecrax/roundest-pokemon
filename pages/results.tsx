import { supabase } from "@utils/initSupabase";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";

interface Pokemon {
  id: number;
  name: string;
  votesFor: number;
  votesAgainst: number;
}

const genPercent = (p: Pokemon) => {
  if (p.votesAgainst + p.votesFor === 0) return 0;
  return (p.votesFor / (p.votesFor + p.votesAgainst)) * 100;
};

const Results: NextPage<{ pokemon: any }> = (props) => {
  return (
    <div>
      <h1 className="text-4xl text-center p-8">Results</h1>

      <div>
        {props.pokemon
          .sort((a: Pokemon, b: Pokemon) => {
            const dif = genPercent(b) - genPercent(a);

            if (dif === 0) {
              return b.votesFor - a.votesFor;
            }

            return dif;
          })
          .map((p: Pokemon, index: number) => {
            return (
              <div className="border-b" key={index}>
                <div className=" flex justify-between items-center px-4 pt-2">
                  <div>
                    <div className="flex">
                      <div>{index + 1 + "."}</div>
                      &nbsp;
                      <div className="capitalize">
                        {p.name + " (" + p.id + ")"}
                      </div>
                    </div>
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                      width={64}
                      height={64}
                      alt={`Image of ${p.name}`}
                    />
                  </div>
                  <div>{genPercent(p).toFixed(2)}%</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data, error } = await supabase.from("pokemon").select("*");

  if (error) console.error(error);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default Results;
