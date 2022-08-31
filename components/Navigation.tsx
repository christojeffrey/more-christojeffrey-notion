import Link from "next/link";

const Navigation = () => {
  const linkOption = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "blog",
      link: "/blog",
    },
    {
      text: "tweet",
      link: "/tweet",
    },
    {
      text: "photo",
      link: "/photo",
    },
  ];
  return (
    <div className="w-full border-2 border-black">
      <div id="link to other content" className="flex justify-center">
        {linkOption.map((item, idx) => {
          return (
            <div className="mx-2 text-xs">
              <Link href={item.link} key={idx}>
                <a className="text-primary-800 mr-3">{item.text}</a>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="absolute right-4 top-4 mx-2 text-xs">
        <a href="https://christojeffrey.com">christojeffrey.com</a>
      </div>
    </div>
  );
};

export default Navigation;
