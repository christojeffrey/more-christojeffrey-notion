const fetcher = async (args: any) => {
  return await fetch(args).then((res) => res.json());
};

export default fetcher;
