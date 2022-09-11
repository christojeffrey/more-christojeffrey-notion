import Link from "next/link";
import { NotionText } from "./post";

// ini adalah Card yang ada di main page
const PostCard = ({ post }) => {
  // console.log("==================");
  // console.log("post", post.properties.publish.checkbox);

  if (post.properties.pageless.checkbox) {
    return <PostCardPageless post={post} />;
  } else {
    return <PostCardPage post={post} />;
  }
};

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
  );
};

const PostCardPageless = ({ post }) => {
  // console.log("==================");
  // console.log("post", post);
  const date = new Date(post.last_edited_time).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
  });
  return (
    // <Link key={post.id} href={`/${post.id}`}>
    <div className="p-2 border-l-4 border-l-neutral-300 text-base mb-1">
      {post.cover && (
        <div className="">
          gambar
          <img src={post.cover.file.url} alt="Cover Image" />
        </div>
      )}
      <div>
        <NotionText text={post.properties.Name.title} />
      </div>
      <div className="text-neutral-500 text-xs">{date}</div>
    </div>
    // </Link>
  );
};
export default PostCard;
