import NotionText from "../../../components/NotionText/NotionText";

const PostCardPageless = ({ post }) => {
  // console.log("==================");
  // console.log("post", post);
  const date = new Date(post.last_edited_time).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
  });
  return (
    // <Link key={post.id} href={`/${post.id}`}>
    <div className="p-2 my-5 border-b-2 border-b-neutral-300 text-base mb-1">
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

export default PostCardPageless;
