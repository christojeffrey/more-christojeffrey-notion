import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";

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
          <h1>blog goblog</h1>
          <p>
            tempat buat cerita. soalnya gada orang yg mo denger. and that's not wrong, ngapain orang mo dengerin hal yg gada advantage nya buat mereka. kalopun ada yg mo denger, probably tak paksa. god i sound like a big ass. here's me
            being sassy to balance it out, OH MYG DOAODASOFASJDLSKJF;LAS;FDLKJ
          </p>
        </header>

        <h2 className={styles.heading}>All Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            });
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <a>
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date}</p>
                <Link href={`/${post.id}`}>
                  <a> Read post →</a>
                </Link>
              </li>
            );
          })}
        </ol>
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
