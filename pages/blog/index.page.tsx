import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import Fade from "react-reveal/Fade";
import useSWR from "swr";
import { useState, useEffect } from "react";

// components
import PostCardPage from "./components/PostCardPage";

// helpers
import fetcher from "../../utils/fetcher";
import { setToLocalStorage } from "../../utils/localStorage";
import { getClientSideProps } from "../../hooks/customHooks";

const Blog = () => {
  const [cachedBlogPosts, cachedHaveMoreBlogPosts] = getClientSideProps(["cachedBlogPosts", "cachedHaveMoreBlogPosts"]);

  const [blogPosts, setBlogPosts] = useState(cachedBlogPosts ?? []);
  const [lastNotionCardId, setLastNotionCardId] = useState("start");
  const [HaveMoreBlogPosts, setHaveMoreBlogPosts] = useState(cachedHaveMoreBlogPosts ?? true);
  const { data: partialBlogPosts, error } = useSWR(HaveMoreBlogPosts ? "/api/notion/blog/10/" + lastNotionCardId : null, fetcher);

  // LOCAL STORAGE SETTERS
  useEffect(() => {
    setToLocalStorage(blogPosts, "cachedBlogPosts");
  }, [blogPosts]);

  useEffect(() => {
    setToLocalStorage(HaveMoreBlogPosts, "cachedHaveMoreBlogPosts");
  }, [HaveMoreBlogPosts]);

  useEffect(() => {
    if (partialBlogPosts) {
      // get everything second to last from partialBlogPosts slice
      if (partialBlogPosts.length === 1) {
        setHaveMoreBlogPosts(false);

        setBlogPosts([...blogPosts, partialBlogPosts[0]]);
      } else {
        setBlogPosts([...blogPosts, ...partialBlogPosts.slice(0, -1)]);
      }
    }
  }, [partialBlogPosts]);

  const loadMoreCard = () => {
    if (HaveMoreBlogPosts) {
      setLastNotionCardId(partialBlogPosts[partialBlogPosts.length - 1].id);
    }
  };

  if (error) {
    return <div>error</div>;
  }
  return (
    <main className="flex justify-center fade-in">
      <Head>
        <title>blog</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="w-11/12 md:w-1/2">
        <section id="hero-container" className="md:h-[30vh] flex items-center justify-center">
          <div>
            <h1>Blog</h1>
            <div>texts! probably taken from somewhere else</div>
          </div>
        </section>
        <section id="divider">
          <div className="text-primary-800">All Posts</div>
          <hr className="text-neutral-400 mb-2 w-full"></hr>
        </section>
        <section id="cards-of-post">
          <InfiniteScroll hasMore={HaveMoreBlogPosts} dataLength={blogPosts.length} next={loadMoreCard} loader={<h4>loading...</h4>} endMessage={<h4>no more posts</h4>}>
            {blogPosts.map((post, idx) => {
              return (
                <Fade key={idx}>
                  <PostCardPage post={post} />
                </Fade>
              );
            })}
          </InfiniteScroll>
        </section>
      </div>
    </main>
  );
};

export default Blog;
