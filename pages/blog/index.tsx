import Head from "next/head";

import { getNotionDatabase } from "../../utils/notion";
import Link from "next/link";
import { NotionText } from "../../components/post";

export const databaseId = process.env.NOTION_DATABASE_ID;

const Blog = ({ posts }) => {
  return (
    <div className="flex  justify-center">
      <Head>
        <title>blog</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="w-1/2">
        <div id="hero-container" className="h-[30vh] flex items-center justify-center">
          <div>
            <h1>Blog</h1>
            <div>probably texts I have taken from somewhere else and claim it to be mine</div>
          </div>
        </div>
        <div className="text-primary-800">All Posts</div>
        <hr className="text-neutral-400 mb-2 w-full"></hr>
        <div id="cards of post">
          {/* card of post in here */}

          {posts.map((post, idx) => {
            return (
              <article key={idx}>
                <PostCardPage post={post} />
              </article>
            );
          })}

          {/* card of post in here */}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = await getNotionDatabase(databaseId, undefined, {
    and: [
      {
        property: "pageless",
        checkbox: {
          equals: false,
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
    revalidate: 1,
  };
};

export default Blog;

const PostCardPage = ({ post }) => {
  const date = new Date(post.last_edited_time).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
  });
  return (
    <Link
      key={post.id}
      href={{
        pathname: `/blog/${post.id}`,
        query: {
          title: post.properties.Name.title[0].plain_text,
        },
      }}
    >
      <a>
        <div className="hover:bg-neutral-300 px-2 py-6 hover:scale-[1.01] hover:duration-75 text-base mx-1 mb-1 rounded-md">
          {post.cover ? (
            <div className="flex">
              <div className="basis-3/4">
                <div className="font-bold">
                  <NotionText text={post.properties.Name.title} />
                </div>
                <div className="flex">
                  <div className="text-neutral-500 text-xs">{date}</div>
                  {post.properties.tags.multi_select.map((e) => {
                    <div>{e.name}</div>;
                  })}
                </div>
              </div>
              <div className="basis-1/4">
                <img src={post.cover.file.url} alt="Cover Image" className="h-9 w-10 object-contain" />
              </div>
            </div>
          ) : (
            <div>
              <div className="font-bold">
                <NotionText text={post.properties.Name.title} />
              </div>
              <div className="flex">
                <div className="text-neutral-500 text-xs basis-1/6">{date}</div>
                {post.properties.tags.multi_select.map((e: any) => {
                  return <div className="text-3xs text-neutral-500 border-2 rounded-full px-1 mx-1 border-neutral-300">{e.name}</div>;
                })}
              </div>
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};
