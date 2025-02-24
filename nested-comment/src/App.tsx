import { useState } from "react";
import initialCommentData from "./data.json";
import { IcommentData } from "./types";

import NestedComment from "./componnets/Nested-comment";
const App = () => {
  const [commentData, setCommentData] =
    useState<IcommentData[]>(initialCommentData);
  return (
    <>
      <div className="py-4 text-center font-semibold">Nested Comment SDQ</div>

      <div className="text-center w-full py-6 relative max-w-5xl mx-auto border-2 min-h-[100vh]">
        <NestedComment commentTree={commentData} />
      </div>
    </>
  );
};

export default App;
