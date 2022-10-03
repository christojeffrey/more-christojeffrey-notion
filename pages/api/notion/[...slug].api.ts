import { NextApiResponse, NextApiRequest } from "next";
import { getNotionDatabase } from "../../../utils/notion";

const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // tweet-or-blog/:size/:id-or-start
  const { slug } = req.query;

  const posts = await getNotionDatabase(databaseId, slug[2] === "start" ? undefined : slug[2], Number(slug[1]), {
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
  res.status(200).send(posts);
}
