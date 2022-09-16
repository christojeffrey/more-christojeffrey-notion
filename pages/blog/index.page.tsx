import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";

import PostCardPage from "./components/PostCardPage";

export const databaseId = process.env.NOTION_DATABASE_ID;

import useSWR from "swr";
import { useState, useEffect } from "react";

const fetcher = async (args: any) => {
  return await fetch("/api/notion/blog/" + args).then((res) => res.json());
};
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [lastNotionCardId, setLastNotionCardId] = useState("start");
  const [haveMoreCard, setHaveMoreCard] = useState(true);
  const { data: tenPosts, error } = useSWR(lastNotionCardId, fetcher);

  useEffect(() => {
    if (tenPosts) {
      // get everything second to last from tenPosts slice
      setPosts([...posts, ...tenPosts.slice(1)]);
      if (tenPosts.length === 1) {
        setHaveMoreCard(false);
      }
    }
  }, [tenPosts]);

  const loadMoreCard = () => {
    setLastNotionCardId(posts[posts.length - 1].id);
  };

  if (error) {
    return <div>error</div>;
  }

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
          <InfiniteScroll hasMore={haveMoreCard} dataLength={posts.length} next={loadMoreCard} loader={<h4>loading...</h4>} endMessage={<h4>no more posts</h4>}>
            {posts.map((post, idx) => {
              return (
                <div key={idx}>
                  <PostCardPage post={post} />
                </div>
              );
            })}
          </InfiniteScroll>
          {/* card of post in here */}
        </div>
      </div>
    </div>
  );
};

export default Blog;
