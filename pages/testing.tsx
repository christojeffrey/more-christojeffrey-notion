// https://github.com/react-grid-layout/react-grid-layout

import StackGrid from "react-stack-grid";

const Testing = () => {
  // layout is an array of objects, see the demo for more complete usage

  return (
    <>
      <StackGrid columnWidth={150}>
        <div key="key1" className="bg-primary">
          Item 1
        </div>
        <div key="key2" className="bg-white">
          Item 2
        </div>
        <div key="key3" className="bg-white">
          Item 3
        </div>
      </StackGrid>
    </>
  );
};
export default Testing;
