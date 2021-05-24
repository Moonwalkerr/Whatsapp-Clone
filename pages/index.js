import Head from "next/head";
import { Sidebar } from "../comps";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Whatsapp 2.0 </title>
        <meta
          name="description"
          content="Instant Messagings and gatherings !"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
    </div>
  );
}
