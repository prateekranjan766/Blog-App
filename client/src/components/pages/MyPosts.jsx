import React from "react";
import Blogs from "../blogs/my-blogs/Blogs";

const MyPosts = (props) => {
  return (
    <div>
      <Blogs history={props.history} />
    </div>
  );
};

export default MyPosts;
