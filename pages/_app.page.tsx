import Navigation from "../components/Navigation/Navigation";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <div id="padding for navigation. Navigation has absolute position" className="h-[50px]" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
