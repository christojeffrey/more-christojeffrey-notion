import { NotionText } from "../NotionText/NotionText";
// notion itu terdiri atas block-block. untuk tiap block, di render pake component renderBlock
export const NotionBlock = ({ block }) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <div className="">
          <NotionText text={value.text} />
        </div>
      );
    case "heading_1":
      return (
        <div className=" text-base md:text-xl mt-7">
          <NotionText text={value.text} />
        </div>
      );
    case "heading_2":
      return (
        <div className="text-base md:text-xl mt-5">
          <NotionText text={value.text} />
        </div>
      );
    case "heading_3":
      return (
        <div className="text-sm md:text-lg mt-3">
          <NotionText text={value.text} />
        </div>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li className="">
          <NotionText text={value.text} />
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} /> <NotionText text={value.text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary className="text-neutral-600">
            <NotionText text={value.text} />
          </summary>
          <div className="mx-6 w-3/4">
            {value.children?.map((block) => (
              <NotionBlock block={block} key={block.id} />
            ))}
          </div>
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src = value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <div className="centerx my-2">
          <img src={src} alt={caption} className="w-1/2" />
          {caption && <figcaption>{caption}</figcaption>}
        </div>
      );
    case "divider":
      return (
        <div className="centerx">
          <hr className="m-3 relative w-full xl:w-16" key={id} />
        </div>
      );
    case "quote":
      return (
        <div className="italic my-4 p-4 border-l-4 border-neutral-900" key={id}>
          {value.text[0].plain_text}
        </div>
      );
    case "video":
      console.log(value);
      return (
        <div className="centerx">
          <iframe src={value.external.url} frameBorder="0" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      );
    case "callout":
      return (
        <div className="rounded-sm m-4 p-3 bg-neutral-300 drop-shadow-md" key={id}>
          <NotionText text={value.text} />
        </div>
      );
    case "code":
      return (
        <div>
          <NotionCode text={value.text} />
        </div>
      );
    default:
      return <div>`❌ Unsupported block (${type === "unsupported" ? "unsupported by Notion API" : type})`</div>;
  }
};
const NotionCode = ({ text }) => {
  const lines = text[0].plain_text.split("\n");

  return (
    <div className="m-5">
      <div className="relative font-mono bg-grey-darker text-white p-5 rounded-md">
        {lines.map((line, index) => {
          const tabs = line.split("\t");
          return (
            <div key={index} className="flex">
              <span className=" text-neutral-200 mr-4">{index + 1}</span>
              {tabs.map((tab, index) => {
                return (
                  <span key={index} className="ml-[2rem]">
                    {tab}
                  </span>
                );
              })}
            </div>
          );
        })}
        <div
          className="absolute top-4 right-4 text-primary-200 hover:text-primary-500 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(text[0].plain_text);
          }}
        >
          copy
        </div>
      </div>
    </div>
  );
};
export default NotionBlock;
