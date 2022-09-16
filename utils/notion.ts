import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getNotionDatabase = async (databaseId, start_cursor = undefined, filter = undefined) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: 10,
    start_cursor,
    filter,
  });

  return response.results;
};

export const getNotionPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getNotionBlocks = async (blockId) => {
  const blocks = [];
  let cursor;
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;
};
