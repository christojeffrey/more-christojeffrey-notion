import Link from "next/link";
import { Text } from "./post";

// ini adalah Card yang ada di main page
const PostCard = ({ post }) => {
  // console.log("==================");
  // console.log("post", post.properties.publish.checkbox);

  if (!post.properties.publish.checkbox) {
    return <></>;
  } else {
    if (post.properties.pageless.checkbox) {
      return <PostCardPageless post={post} />;
    } else {
      return <PostCardPage post={post} />;
    }
  }
};

const PostCardPage = ({ post }) => {
  // console.log("==================");
  // console.log("post", post);
  const date = new Date(post.last_edited_time).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
  });
  return (
    <Link key={post.id} href={`/${post.id}`}>
      <div className="hover:bg-neutral-300 p-2 hover:scale-[1.01] hover:duration-75 text-base mx-1 mb-1">
        {post.cover ? (
          <div className="flex">
            <div className="basis-3/4">
              <div className="font-bold">
                <Text text={post.properties.Name.title} />
              </div>
              <div className="text-neutral-500 text-xs">{date}</div>
            </div>
            <div className="basis-1/4">
              <img src={post.cover.file.url} alt="Cover Image" className="h-9 w-10 object-contain" />
            </div>
          </div>
        ) : (
          <div>
            <div className="font-bold">
              <Text text={post.properties.Name.title} />
            </div>
            <div className="text-neutral-500 text-xs">{date}</div>
          </div>
        )}
      </div>
    </Link>
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
    <Link key={post.id} href={`/${post.id}`}>
      <div className="p-2 border-l-4 border-l-neutral-300 text-lg mb-7">
        {post.cover && (
          <div className="w-full">
            <img src={post.cover.file.url} alt="Cover Image" />
          </div>
        )}
        <div>
          <Text text={post.properties.Name.title} />
        </div>
        <div className="text-neutral-500 text-xs">{date}</div>
      </div>
    </Link>
  );
};
export default PostCard;
