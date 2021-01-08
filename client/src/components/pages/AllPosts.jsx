import React, { useEffect, useContext } from "react";
import Blogs from "../blogs/Blogs";
import AuthContext from "./../../context/auth/authContext";

const AllPosts = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Blogs />
    </div>
  );
};

export default AllPosts;
