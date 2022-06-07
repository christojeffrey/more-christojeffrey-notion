import { Fragment } from "react";
import styles from "./post.module.css";

// suatu text biasa di notion itu bisa ada yg di bold, italic, dkk. untuk tiap Text, di render menggunakan component Text.
export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span className={[bold ? styles.bold : "", code ? styles.code : "", italic ? styles.italic : "", strikethrough ? styles.strikethrough : "", underline ? styles.underline : ""].join(" ")} style={color !== "default" ? { color } : {}}>
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

// notion itu terdiri atas block block. untuk tiap block, di render pake component renderBlock
export const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <div className="m-1">
          <Text text={value.text} />
        </div>
      );
    case "heading_1":
      return (
        <div className="m-1 text-5xl">
          <Text text={value.text} />
        </div>
      );
    case "heading_2":
      return (
        <div className="m-1 text-2xl">
          <Text text={value.text} />
        </div>
      );
    case "heading_3":
      return (
        <div className="m-1 text-xl">
          <Text text={value.text} />
        </div>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li className="m-1">
          <Text text={value.text} />
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} /> <Text text={value.text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary className="m-1">
            <Text text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src = value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <hr className="m-1" key={id} />;
    case "quote":
      return (
        <div className="italic m-4" key={id}>
          {value.text[0].plain_text}
        </div>
      );
    case "video":
      console.log(value);
      return (
        <div>
          <iframe src={value.external.url} frameBorder="0" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      );
    case "callout":
      return (
        <div className="m-4 p-3 bg-grey-darkest" key={id}>
          <Text text={value.text} />
        </div>
      );
    default:
      return `❌ Unsupported block (${type === "unsupported" ? "unsupported by Notion API" : type})`;
  }
};
