import Head from "next/head";
import Banner from "../../components/Banner/index";
import Header from "../../components/Header/index";
import Movies from "../../components/Movies/index";


export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
       <Header/>
       <Banner/>
       <Movies/>
      </main>
    </>
  );
}
