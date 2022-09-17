import Link from "next/link";
import NotionText from "../../../components/NotionText/NotionText";

const PostCardPage = ({ post }) => {
  let date = new Date(post.last_edited_time);
  let dateString: String;

  // if today, dateString = "Today"
  // if this week, dateString = "this week"
  // if this month, dateString = "this month"
  // else, show date
  if (date.toDateString() === new Date().toDateString()) {
    dateString = "Today";
  } else if (date.toDateString() === new Date().toDateString()) {
    dateString = "this week";
  } else if (date.toDateString() === new Date().toDateString()) {
    dateString = "this month";
  } else {
    dateString = date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
    });
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
      <div className="hover:bg-neutral-300 px-2 py-6 hover:scale-[1.01] hover:duration-75 text-base mx-1 mb-1 rounded-md">
        {post.cover ? (
          <div className="flex">
            <div className="basis-3/4">
              <div className="font-bold">
                <NotionText text={post.properties.Name.title} />
              </div>
              <div className="flex">
                <div className="text-neutral-500 text-xs">{dateString}</div>
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
              <div className="text-neutral-500 text-xs basis-1/3 md:basis-1/6">{dateString}</div>
              {post.properties.tags.multi_select.map((e: any, index: any) => {
                return (
                  <div key={index} className="text-3xs text-neutral-500 border-2 rounded-full px-1 mx-1 border-neutral-300">
                    {e.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PostCardPage;
