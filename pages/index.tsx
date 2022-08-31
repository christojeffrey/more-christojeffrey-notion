import Head from "next/head";
import StackGrid from "react-stack-grid";

import { getDatabase } from "../utils/notion";

import PostCard from "../components/postCard";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home() {
  return (
    <div className="bg-white pt-6 text-neutral-900 min-h-screen">
      <Head>
        <title>blog</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Navigation />
      <div className="flex flex-col items-center justify-center m-10">
        <div className="">blog</div>
        <div className="text-sm w-1/2 text-center">helo! im jeff, and site ini dipake buat cerita, whatever i feel like to tell. the content here is like twitter, instagram, and, medium </div>
      </div>
    </div>
  );
}
