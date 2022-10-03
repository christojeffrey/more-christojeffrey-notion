import Link from "next/link";
import NotionText from "../../../components/NotionText/NotionText";

const PostCardPage = ({ post }) => {
  // console.log("post", post);
  let date = new Date(post.last_edited_time);
  let dateString: String;

  // 7 days ago
  let today = new Date();

  if (date.toDateString() === new Date().toDateString()) {
    dateString = "Today";
    // if yesterday
  } else if (date.toDateString() === new Date(new Date().setDate(today.getDate() - 1)).toDateString()) {
    dateString = "Yesterday";
  } else if (date.toDateString() === new Date(new Date().setDate(today.getDate() - 2)).toDateString()) {
    dateString = "2 days ago";
  } else {
    // check how many days ago
    let daysAgo = Math.floor((today.getTime() - date.getTime()) / (1000 * 3600 * 24));
    // console.log("daysAgo", daysAgo);
    if (daysAgo <= 7) {
      dateString = "this week";
    } else if (daysAgo <= 28) {
      // how many weeks ago
      let weeksAgo = Math.floor(daysAgo / 7);
      dateString = `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`;
    } else {
      dateString = date.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
      });
    }
  }

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
        <article className="hover:bg-neutral-300 px-2 py-6 hover:scale-[1.01] hover:duration-75 text-base mx-1 mb-1 rounded-md">
          <div className={`${post.cover ? "flex" : ""}`}>
            <section className={`${post.cover ? "basis-3/4" : ""}`}>
              <div className="font-bold">
                <NotionText text={post.properties.Name.title} />
              </div>
              <div className="flex">
                <div className="text-neutral-500 text-xs basis-2/5 sm:basis-1/4">{dateString}</div>
                {post.properties.tags.multi_select.map((e: any, index: any) => {
                  return (
                    <div key={index} className="text-3xs text-neutral-500 border-2 rounded-full px-1 mx-1 border-neutral-300">
                      {e.name}
                    </div>
                  );
                })}
              </div>
            </section>
            {post.cover && (
              <section className={`${post.cover ? "basis-1/4" : ""}`}>
                <img src={post.cover.file.url} alt="Cover Image" className="h-9 w-10 object-contain" />
              </section>
            )}
          </div>
        </article>
      </a>
    </Link>
  );
};

export default PostCardPage;
