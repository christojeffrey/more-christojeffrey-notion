import Link from "next/link";

const Navigation = () => {
  const linkOption = [
    {
      text: "home",
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
    <div className="w-full pt-4">
      <div id="link to other content" className="flex justify-center">
        {linkOption.map((item, idx) => {
          return (
            <div className="mx-2 text-xs">
              <Link href={item.link} key={idx}>
                <div className="text-primary-700 mr-3 hover:text-primary-900">{item.text}</div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="absolute right-4 top-4 mx-2 text-xs text-primary-700 hover:text-primary-900">
        <a href="https://christojeffrey.com">christojeffrey.com</a>
      </div>
    </div>
  );
};

export default Navigation;
