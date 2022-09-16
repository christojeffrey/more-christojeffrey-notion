import Head from "next/head";

import { getNotionDatabase } from "../../utils/notion";

import NotionText from "../../components/NotionText/NotionText";

export const databaseId = process.env.NOTION_DATABASE_ID;

const Blog = ({ posts }) => {
  return (
    <div className="flex  justify-center">
      <Head>
        <title>tweet</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="w-1/2">
        <div id="hero-container" className="h-[30vh] flex items-center justify-center">
          <div>
            <h1>tweet</h1>
            <div>shorter than the shortest blog</div>
          </div>
        </div>
        <div className="text-primary-800">All Posts</div>
        <hr className="text-neutral-400 mb-2 w-full"></hr>
        <div id="cards of post">
          {/* card of post in here */}

          {posts.map((post, idx) => {
            return (
              <div key={idx}>
                <PostCardPageless post={post} />
              </div>
            );
          })}

          {/* card of post in here */}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const posts = await getNotionDatabase(databaseId, undefined, {
    and: [
      {
        property: "pageless",
        checkbox: {
          equals: true,
        },
      },
      {
        property: "publish",
        checkbox: {
          equals: true,
        },
      },
    ],
  });

  return {
    props: {
      posts,
    },
  };
};

export default Blog;

const PostCardPageless = ({ post }) => {
  // console.log("==================");
  // console.log("post", post);
  const date = new Date(post.last_edited_time).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
  });
  return (
    // <Link key={post.id} href={`/${post.id}`}>
    <div className="p-2 my-5 border-b-2 border-b-neutral-300 text-base mb-1">
      {post.cover && (
        <div className="">
          gambar
          <img src={post.cover.file.url} alt="Cover Image" />
        </div>
      )}
      <div>
        <NotionText text={post.properties.Name.title} />
      </div>
      <div className="text-neutral-500 text-xs">{date}</div>
    </div>
    // </Link>
  );
};
