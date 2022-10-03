import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWR from "swr";
import Fade from "react-reveal/Fade";
import { useState, useEffect } from "react";

// components
import PostCardPageless from "./components/PostCardPageless";

// helpers
import { getClientSideProps } from "../../hooks/customHooks";
import fetcher from "../../utils/fetcher";
import { setToLocalStorage } from "../../utils/localStorage";

const Tweet = () => {
  const [cachedTweetPosts, cachedHaveMoreTweetPosts] = getClientSideProps(["cachedTweetPosts", "cachedHaveMoreTweetPosts"]);

  const [tweetPosts, setTweetPosts] = useState(cachedTweetPosts ?? []);
  const [lastNotionCardId, setLastNotionCardId] = useState("start");
  const [HaveMoreTweetPosts, setHaveMoreTweetPosts] = useState(cachedHaveMoreTweetPosts ?? true);
  const { data: partialTweetPosts, error } = useSWR(HaveMoreTweetPosts ? "/api/notion/tweet/10/" + lastNotionCardId : null, fetcher);

  // LOCAL STORAGE SETTERS
  useEffect(() => {
    setToLocalStorage(tweetPosts, "cachedTweetPosts");
  }, [tweetPosts]);

  useEffect(() => {
    setToLocalStorage(HaveMoreTweetPosts, "cachedHaveMoreTweetPosts");
  }, [HaveMoreTweetPosts]);

  useEffect(() => {
    if (partialTweetPosts) {
      // get everything second to last from partialTweetPosts slice
      if (partialTweetPosts.length === 1) {
        setHaveMoreTweetPosts(false);

        setTweetPosts([...tweetPosts, partialTweetPosts[0]]);
      } else {
        setTweetPosts([...tweetPosts, ...partialTweetPosts.slice(0, -1)]);
      }
    }
  }, [partialTweetPosts]);

  const loadMoreCard = () => {
    console.log("load more card");
    if (HaveMoreTweetPosts) {
      setLastNotionCardId(partialTweetPosts[partialTweetPosts.length - 1].id);
    }
  };

  if (error) {
    return <div>error</div>;
  }
  return (
    <main className="flex justify-center fade-in">
      <Head>
        <title>tweet</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="w-11/12 md:w-1/2">
        <section id="hero-container" className="md:h-[30vh] flex items-center justify-center">
          <div>
            <h1>Tweet</h1>
            <div>shorter than the shortest blog</div>
          </div>
        </section>
        <section id="divider">
          <div className="text-primary-800">All Posts</div>
          <hr className="text-neutral-400 mb-2 w-full"></hr>
        </section>
        <section id="cards-of-post">
          <InfiniteScroll hasMore={HaveMoreTweetPosts} dataLength={tweetPosts.length} next={loadMoreCard} loader={<h4>loading...</h4>} endMessage={<h4>no more posts</h4>}>
            {tweetPosts.map((post, idx) => {
              return (
                <Fade key={idx}>
                  <PostCardPageless post={post} />
                </Fade>
              );
            })}
          </InfiniteScroll>
        </section>
      </div>
    </main>
  );
};

export default Tweet;
