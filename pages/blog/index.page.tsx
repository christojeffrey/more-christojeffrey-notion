import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";

import PostCardPage from "./components/PostCardPage";

export const databaseId = process.env.NOTION_DATABASE_ID;

import useSWR from "swr";
import { useState, useEffect } from "react";

import Fade from "react-reveal/Fade";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

const fetcher = async (args: any) => {
  return await fetch("/api/notion/blog/10/" + args).then((res) => res.json());
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [lastNotionCardId, setLastNotionCardId] = useState("start");
  const [haveMoreCard, setHaveMoreCard] = useState(true);
  const { data: tenPosts, error } = useSWR(lastNotionCardId, fetcher);

  useEffect(() => {
    if (tenPosts) {
      // get everything second to last from tenPosts slice
      if (tenPosts.length === 1) {
        setHaveMoreCard(false);
        setPosts([...posts, ...tenPosts]);
      } else {
        setPosts([...posts, ...tenPosts.slice(0, -1)]);
      }
    }
  }, [tenPosts]);

  const loadMoreCard = () => {
    setLastNotionCardId(tenPosts[tenPosts.length - 1].id);
  };

  if (error) {
    return <div>error</div>;
  }
  return (
    <div className="flex justify-center fade-in">
      <Head>
        <title>blog</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="w-11/12 md:w-1/2">
        <div id="hero-container" className="md:h-[30vh] flex items-center justify-center">
          <div>
            <h1>Blog</h1>
            <div>texts I have taken ... from somewhere else</div>
          </div>
        </div>
        <div className="text-primary-800">All Posts</div>
        <hr className="text-neutral-400 mb-2 w-full"></hr>
        <div id="cards of post">
          {/* card of post in here */}
          <InfiniteScroll
            hasMore={haveMoreCard}
            dataLength={posts.length}
            next={loadMoreCard}
            loader={
              <h4>
                loading...
                {/* <Skeleton count={10} /> */}
              </h4>
            }
            endMessage={<h4>no more posts</h4>}
          >
            {posts.map((post, idx) => {
              return (
                <Fade>
                  <PostCardPage post={post} key={idx} />
                </Fade>
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
