import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";

import PostCardPage from "./components/PostCardPage";

export const databaseId = process.env.NOTION_DATABASE_ID;

import useSWR from "swr";
import { useState, useEffect } from "react";

import Fade from "react-reveal/Fade";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

const blogFetcher = async (args: any) => {
  return await fetch(args).then((res) => res.json());
};

const Blog = () => {
  // alternative to 'getClientSideProps'
  // the reason for not using useEffect with empty array is because, I want this to be runned first. before useState
  const [isInitial, setIsInitial] = useState(true);

  let cachedBlogPosts;
  let cachedHaveMoreBlogPosts;
  if (isInitial) {
    if (typeof window !== "undefined") {
      cachedBlogPosts = JSON.parse(localStorage.getItem("blogPosts"));
    }
    if (typeof window !== "undefined") {
      cachedHaveMoreBlogPosts = JSON.parse(localStorage.getItem("haveMoreBlogPosts"));
      if (cachedHaveMoreBlogPosts === null) {
        cachedHaveMoreBlogPosts = true;
      } else {
        cachedHaveMoreBlogPosts = JSON.parse(cachedHaveMoreBlogPosts);
      }
    }
    setIsInitial(false);
  }

  const [blogPosts, setBlogPosts] = useState(cachedBlogPosts ?? []);
  const [lastNotionCardId, setLastNotionCardId] = useState("start");
  const [HaveMoreBlogPosts, setHaveMoreBlogPosts] = useState(cachedHaveMoreBlogPosts);
  const { data: tenBlogPosts, error } = useSWR(HaveMoreBlogPosts ? "/api/notion/blog/10/" + lastNotionCardId : null, blogFetcher);

  useEffect(() => {
    // set to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
    }
  }, [blogPosts]);

  useEffect(() => {
    //set to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("haveMoreBlogPosts", JSON.stringify(HaveMoreBlogPosts));
    }
  }, [HaveMoreBlogPosts]);

  useEffect(() => {
    if (tenBlogPosts) {
      // get everything second to last from tenBlogPosts slice
      if (tenBlogPosts.length === 1) {
        setHaveMoreBlogPosts(false);

        setBlogPosts([...blogPosts, tenBlogPosts[0]]);
      } else {
        setBlogPosts([...blogPosts, ...tenBlogPosts.slice(0, -1)]);
      }
      console.log("test");
    }
  }, [tenBlogPosts]);

  const loadMoreCard = () => {
    console.log("load more card");
    if (HaveMoreBlogPosts) {
      setLastNotionCardId(tenBlogPosts[tenBlogPosts.length - 1].id);
    }
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
            <div>texts! probably taken from somewhere else</div>
          </div>
        </div>
        <div className="text-primary-800">All Posts</div>
        <hr className="text-neutral-400 mb-2 w-full"></hr>
        <div id="cards of post">
          {/* card of post in here */}
          <InfiniteScroll hasMore={HaveMoreBlogPosts} dataLength={blogPosts.length} next={loadMoreCard} loader={<h4>loading...</h4>} endMessage={<h4>no more posts</h4>}>
            {blogPosts.map((post, idx) => {
              return (
                <Fade key={idx}>
                  <PostCardPage post={post} />
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
