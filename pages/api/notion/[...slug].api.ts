import { NextApiResponse, NextApiRequest } from "next";
import { getNotionDatabase } from "../../../utils/notion";

const blogTweetDatabaseId = process.env.NOTION_DATABASE_ID_BLOG_TWEET;
const photoDatabaseId = process.env.NOTION_DATABASE_ID_PHOTO;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // :database/:size/:start-id

  // photo/
  // blog/:size/:start-id
  // tweet/:size/:start-id

  const { slug } = req.query;
  const database = slug[0];

  let data;
  if (database === "photo") {
    data = await getNotionDatabase(photoDatabaseId);
  } else {
    data = await getNotionDatabase(blogTweetDatabaseId, slug[2] ?? undefined, Number(slug[1]), {
      and: [
        {
          property: "pageless",
          checkbox: {
            equals: slug[0] === "tweet",
          },
        },
        {
          property: "publish",
          checkbox: {
            equals: true,
          },
        },
      ],
    });
  }

  res.status(200).send(data);
}
