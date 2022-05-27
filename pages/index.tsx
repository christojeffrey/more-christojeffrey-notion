import Head from "next/head";
import StackGrid from "react-stack-grid";
import styles from "./index.module.css";

import { getDatabase } from "../utils/notion";

import PostCard from "../components/postCard";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  console.log(posts);

  return (
    <div>
      <Head>
        <title>blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logos}></div>
          <h1>blog</h1>
          <p>helo! im jeff, and site ini dipake buat cerita, whatever i feel like to tell. the content here is like twitter, instagram, and, medium combined </p>
        </header>

        <h2 className={styles.heading}>All Posts</h2>
        <div className={styles.posts}>
          {/* card of post in here */}

          <StackGrid columnWidth={300} monitorImagesLoaded={true} gutterWidth={30} gutterHeight={30}>
            {posts.map((post, idx) => {
              return (
                <div key={idx} className="m-1">
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
