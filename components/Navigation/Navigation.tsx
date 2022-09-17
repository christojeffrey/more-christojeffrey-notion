import Link from "next/link";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { slide as Menu } from "react-burger-menu";
import { useEffect, useState } from "react";
let styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    right: "36px",
    top: "36px",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

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
  // check is mobile

  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  if (!isMobile) {
    return (
      <div className="w-full pt-4 fade-in">
        <div id="link to other content" className="flex justify-center">
          {linkOption.map((item, idx) => {
            return (
              <div key={idx} className="mx-2 text-xs">
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
        <Menu styles={styles} isOpen={false} right>
          <div className="mx-2 text-xs flex">
            {linkOption.map((item, idx) => {
              return (
                <Link href={item.link} key={idx}>
                  <div className="text-primary-700 mr-3 hover:text-primary-900">{item.text}</div>
                </Link>
              );
            })}
          </div>
        </Menu>
      </>
    );
  }
};

export default Navigation;
