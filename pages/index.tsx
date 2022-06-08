import Head from "next/head";
import StackGrid from "react-stack-grid";
import styles from "./index.module.css";

import { getDatabase } from "../utils/notion";

import PostCard from "../components/postCard";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  console.log(posts);

  return (
    <div className="bg-neutral-100 pt-6 text-neutral-900">
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

          <StackGrid columnWidth={300} monitorImagesLoaded={true} gutterWidth={30} gutterHeight={30}>
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
