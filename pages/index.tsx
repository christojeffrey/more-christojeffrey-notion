import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../utils/notion";
import { Text } from "../components/post";
import styles from "./index.module.css";
import StackGrid from "react-stack-grid";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  console.log(posts);

  return (
    <div>
      <Head>
        <title>blog goblog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logos}></div>
          <h1>blog</h1>
          <p>helo! site ini dipake buat cerita, whatever i feel like to tell</p>
        </header>

        <h2 className={styles.heading}>All Posts</h2>
        <div className={styles.posts}>
          {/* card of post in here */}

          <StackGrid columnWidth={200} monitorImagesLoaded={true} gutterWidth={10} gutterHeight={10}>
            {posts.map((post, idx) => {
              return (
                <div key={idx}>
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

const PostCard = ({ post }) => {
  console.log("post", post);
  const date = new Date(post.last_edited_time).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <Link key={post.id} href={`/${post.id}`}>
      <div className="border-white border-2">
        {post.cover && <img src={post.cover.file.url} alt="Cover Image" className="w-full" />}
        <h3 className={styles.postTitle}>
          <Text text={post.properties.Name.title} />
        </h3>
        <p className={styles.postDescription}>{date}</p>
      </div>
    </Link>
  );
};

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
