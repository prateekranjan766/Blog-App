import React, { useEffect, useContext } from "react";
import Blogs from "../blogs/Blogs";
import AuthContext from "./../../context/auth/authContext";
import BlogContext from "./../../context/blog/blogContext";
import Footer from "./../layout/Footer";

const AllPosts = () => {
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);
  const { getBlogs } = blogContext;
  useEffect(() => {
    authContext.loadUser();
    getBlogs();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Blogs />
      <Footer />
    </div>
  );
};

export default AllPosts;
