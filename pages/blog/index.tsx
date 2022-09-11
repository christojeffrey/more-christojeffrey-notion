import Head from "next/head";
import StackGrid from "react-stack-grid";

import { getDatabase } from "../../utils/notion";

import PostCard from "../../components/postCard";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Link from "next/link";
import { NotionText } from "../../components/post";

export const databaseId = process.env.NOTION_DATABASE_ID;

const Blog = ({ posts }) => {
  const { height, width } = useWindowDimensions();

  const [columnWidth, setColumnWidth] = useState(300);

  useEffect(() => {
    let temp = Math.floor(width * 0.75);
    if (temp > 600) {
      temp = 600;
    }
    // console.log("temp" + temp);
    setColumnWidth(temp);
  }, [width]);
  return (
    <div className="flex  justify-center">
      <Head>
        <title>blog</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="w-1/2">
        <h1>Blog</h1>
        <div className="text-primary-800">All Posts</div>
        <hr className="text-neutral-400 mb-2 w-full"></hr>
        <div id="cards of post">
          {/* card of post in here */}

          <StackGrid columnWidth={columnWidth} monitorImagesLoaded={true} gutterWidth={30} gutterHeight={30}>
            {posts.map((post, idx) => {
              return (
                <div key={idx}>
                  <PostCardPage post={post} />
                </div>
              );
            })}
          </StackGrid>

          {/* card of post in here */}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);
  // filter database
  const posts = database.filter((post: any) => {
    return post.properties.publish.checkbox && !post.properties.pageless.checkbox;
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
  // console.log("==================");
  post.properties.tags.multi_select.map((e) => {
    console.log("e", e);
  });

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
      <div className="hover:bg-neutral-300 p-2 hover:scale-[1.01] hover:duration-75 text-base mx-1 mb-1 rounded-md">
        {post.cover ? (
          <div className="flex">
            <div className="basis-3/4">
              <div className="">
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
            <div className="">
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
    </Link>
  );
};
