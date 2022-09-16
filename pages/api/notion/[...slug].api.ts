import { NextApiResponse, NextApiRequest } from "next";
import { getNotionDatabase } from "../../../utils/notion";
export const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log("testing im called!");
  const { slug } = req.query;
  console.log("slug", slug);

  const posts = await getNotionDatabase(databaseId, slug[1] === "start" ? undefined : slug[1], {
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
  console.log("posts", posts);
  res.status(200).send(posts);
}
