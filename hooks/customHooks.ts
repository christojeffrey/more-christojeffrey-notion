import { useState, useEffect, useRef } from "react";
import { getFromLocalStorage } from "../utils/localStorage";
// if a function use a hook(build in react function that its name start with 'use..'), it is a custom hook

export function useWindowDimensions() {
  const [width, setWidth] = useState<number>();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  return { width };
}

export const getClientSideProps = (keys: string[]) => {
  // a fake 'getClientSideProps'. Next doesn't have this function
  // the reason for not using useEffect with empty array is because, I want this to be runned first(before useState). I want the value of the first time render to be the value of the local storage. so that the 'preserve scroll' works. if I use useState, blogPost would be [] at first, and then populated with the data from localStorage. This will render the web first, which tell the browser that the length of the page is, at least, shorter than the previous time rendered. So it won't go the the previous scroll position. I want the first render to be the same as the previous render, so that the browser will go to the previous scroll position.

  // using useRef because I just need a variable stay between render, but not trigger a re-render
  const isInitial = useRef(true);

  let result = [];
  if (isInitial.current) {
    keys.map((key) => {
      result.push(getFromLocalStorage(key));
    });

    isInitial.current = false;
  }

  return result;
};
