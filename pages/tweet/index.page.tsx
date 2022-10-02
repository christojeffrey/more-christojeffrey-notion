import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";

export const databaseId = process.env.NOTION_DATABASE_ID;

import useSWR from "swr";
import { useState, useEffect } from "react";

import Fade from "react-reveal/Fade";
import PostCardPageless from "./components/PostCardPageless";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

const tweetFetcher = async (args: any) => {
  console.log("tweetFetcher", args);
  return await fetch(args).then((res) => res.json());
};

const Tweet = () => {
  let cachedTweetPosts;
  let cachedHaveMoreTweetPosts;
  if (typeof window !== "undefined") {
    cachedTweetPosts = JSON.parse(localStorage.getItem("blogPosts"));
  }
  if (typeof window !== "undefined") {
    cachedHaveMoreTweetPosts = JSON.parse(localStorage.getItem("haveMoreBlogPosts"));
  }

  const [tweetPosts, setTweetPosts] = useState(cachedTweetPosts || []);
  const [lastNotionCardId, setLastNotionCardId] = useState("start");
  const [HaveMoreTweetPosts, setHaveMoreTweetPosts] = useState(cachedHaveMoreTweetPosts || true);
  const { data: tenTweetPosts, error } = useSWR("/api/notion/tweet/10/" + lastNotionCardId, tweetFetcher);

  useEffect(() => {
    // set to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("tweetPosts", JSON.stringify(tweetPosts));
    }
  }, [tweetPosts]);

  useEffect(() => {
    //set to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("HaveMoreTweetPosts", JSON.stringify(HaveMoreTweetPosts));
    }
  }, [HaveMoreTweetPosts]);

  useEffect(() => {
    if (tenTweetPosts) {
      // get everything second to last from tenTweetPosts slice
      if (tenTweetPosts.length === 1) {
        setHaveMoreTweetPosts(false);

        setTweetPosts([...tweetPosts, tenTweetPosts[0]]);
      } else {
        setTweetPosts([...tweetPosts, ...tenTweetPosts.slice(0, -1)]);
      }
    }
  }, [tenTweetPosts]);

  const loadMoreCard = () => {
    console.log("load more card");
    if (HaveMoreTweetPosts) {
      setLastNotionCardId(tenTweetPosts[tenTweetPosts.length - 1].id);
    }
  };

  if (error) {
    return <div>error</div>;
  }
  return (
    <div className="flex justify-center fade-in">
      <Head>
        <title>tweet</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="w-11/12 md:w-1/2">
        <div id="hero-container" className="md:h-[30vh] flex items-center justify-center">
          <div>
            <h1>Tweet</h1>
            <div>shorter than the shortest blog</div>
          </div>
        </div>
        <div className="text-primary-800">All Posts</div>
        <hr className="text-neutral-400 mb-2 w-full"></hr>
        <div id="cards of post">
          {/* card of post in here */}
          <InfiniteScroll hasMore={HaveMoreTweetPosts} dataLength={tweetPosts.length} next={loadMoreCard} loader={<h4>loading...</h4>} endMessage={<h4>no more posts</h4>}>
            {tweetPosts.map((post, idx) => {
              return (
                <Fade key={idx}>
                  <PostCardPageless post={post} />
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

export default Tweet;
