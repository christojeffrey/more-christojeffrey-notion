import { Fragment } from "react";
import Head from "next/head";
import { getDatabase, getPage, getBlocks } from "../utils/notion";
import Link from "next/link";
import { Text, renderBlock } from "../components/post";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div />;
  }
  return (
    <>
      <Head>
        <title>{page.properties.Name.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-3 pt-5 pb-2 bg-neutral-100 text-neutral-900 font-medium min-h-screen">
        {/* judul */}
        <div className="centerx">
          <div className="w-full md:w-15 text-left text-xl md:font-semibold">
            <Text text={page.properties.Name.title} />
          </div>
        </div>
        {/* judul */}
        {/* isi */}
        <div className="centerx">
          <div className="w-full md:w-15 text-2xs md:text-base">
            {blocks.map((block) => (
              <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
          </div>
        </div>
        {/* isi */}
        {/* back button */}
        <div className="centerx text-primary-700 mt-10 mb-6 font-bold text-xs md:text-base">
          <Link href="/">
            <a>back</a>
          </Link>
        </div>
        {/* back button */}
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find((x) => x.id === block.id)?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
