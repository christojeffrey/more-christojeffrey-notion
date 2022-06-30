import Head from "next/head";
import StackGrid from "react-stack-grid";
import styles from "./index.module.css";

import { getDatabase } from "../utils/notion";

import PostCard from "../components/postCard";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useEffect, useState } from "react";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  const { height, width } = useWindowDimensions();
  const [columnWidth, setColumnWidth] = useState(300);

  useEffect(() => {
    let temp = Math.floor(width * 0.75);
    if (temp > 600) {
      temp = 600;
    }
    console.log("temp" + temp);
    setColumnWidth(temp);
  }, [width]);

  console.log(height, width);
  return (
    <div className="bg-neutral-100 pt-6 text-neutral-900 min-h-screen">
      <Head>
        <title>blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full md:w-15 mx-auto p-3">
        <header className="mb-6">
          <div className="centerx">
            <div className="w-3/4">
              <div className="">blog</div>
              <div className="text-sm">helo! im jeff, and site ini dipake buat cerita, whatever i feel like to tell. the content here is like twitter, instagram, and, medium combined </div>
            </div>
          </div>
        </header>

        <div className="text-primary-800">All Posts</div>
        <hr className="text-neutral-400 mb-2 w-full"></hr>
        <div className={styles.posts}>
          {/* card of post in here */}

          <StackGrid columnWidth={columnWidth} monitorImagesLoaded={true} gutterWidth={30} gutterHeight={30}>
            {posts.map((post, idx) => {
              return (
                <div key={idx} className="">
                  <PostCard post={post} />
                </div>
              );
            })}
          </StackGrid>

          {/* card of post in here */}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
