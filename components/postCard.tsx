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
      <div className="hover:bg-black p-3 rounded-lg hover:scale-[1.1] hover:duration-75">
        {post.cover && <img src={post.cover.file.url} alt="Cover Image" className="w-full" />}
        <h3>
          <Text text={post.properties.Name.title} />
        </h3>
        <p className="text-grey text-xs">{date}</p>
      </div>
    </Link>
  );
};

export default PostCard;
