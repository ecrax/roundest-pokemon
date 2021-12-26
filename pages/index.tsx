import type { NextPage } from "next";
import Head from "next/head";


const Home: NextPage = () => {
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
            <div className="pt-2">Pokemon 1</div>
            <div className="p-2"/>
            <button className="bg-white text-black font-bold py-2 px-4 rounded-full">Rounder</button>
          </div>
          <div className="px-8">or</div>
          <div className="flex-col pb-2">
            <div className="pt-2">Pokemon 2</div>
            <div className="p-2"/>
            <button className="bg-white text-black font-bold py-2 px-4 rounded-full">Rounder</button>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
