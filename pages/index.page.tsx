import Head from "next/head";

export default function Home() {
  return (
    <main className="bg-white text-neutral-900 min-h-[80vh] flex flex-col items-center justify-center fade-in">
      <Head>
        <title>blog</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <div className="flex flex-col items-center justify-center">
        <div className="">nugget? log?</div>
        <div className="text-sm text-center w-5/6">helo! im jeff, and site ini dipake buat cerita, whatever i feel like to tell </div>
      </div>
    </main>
  );
}
