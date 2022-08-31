import Head from "next/head";
import StackGrid from "react-stack-grid";

import { getDatabase } from "../utils/notion";

import PostCard from "../components/postCard";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

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
      <div className="w-1/2">
        <h1>Blog</h1>
        <div className="text-primary-800">All Posts</div>
        <hr className="text-neutral-400 mb-2 w-full"></hr>
        <div id="cards of post">
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
