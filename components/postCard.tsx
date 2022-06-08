import Link from "next/link";
import { Text } from "./post";

// ini adalah Card yang ada di main page
const PostCard = ({ post }) => {
  console.log("post", post);
  const date = new Date(post.last_edited_time).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <Link key={post.id} href={`/${post.id}`}>
      <div className="hover:bg-neutral-300 p-2 rounded-md hover:scale-[1.05] hover:duration-75 text-base m-1">
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
