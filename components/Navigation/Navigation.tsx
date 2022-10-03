import Link from "next/link";
import { useWindowDimensions } from "../../hooks/customHooks";
import { slide as Menu } from "react-burger-menu";
import { useState } from "react";
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
    {
      text: "external",
      link: "/external",
    },
  ];
  // check is mobile

  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  const [isOpen, setIsOpen] = useState(false);

  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  if (!isMobile) {
    return (
      <div className="w-full pt-4 fade-in absolute">
        <div id="link to other content" className="flex justify-center">
          {linkOption.map((item, idx) => {
            return (
              <div key={idx} className="mx-2">
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
  } else {
    return (
      <>
        <Menu isOpen={isOpen} onStateChange={handleStateChange} right>
          <div className="mx-2 text-xs flex">
            {linkOption.map((item, idx) => {
              return (
                <Link href={item.link} key={idx}>
                  <a
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <div className="text-white mr-3 hover:text-primary-900 p-1">{item.text}</div>
                  </a>
                </Link>
              );
            })}
            <div className="px-1 py-6">
              <a href="https://christojeffrey.com">christojeffrey.com</a>
            </div>
          </div>
        </Menu>
      </>
    );
  }
};

export default Navigation;
