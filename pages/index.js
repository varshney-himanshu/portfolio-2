import Head from "next/head";
import Header from "../components/Header/Header.component";

export default function Home() {
  return (
    <>
      <Head>
        <title>Himanshu Varshney</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
      </main>
    </>
  );
}
