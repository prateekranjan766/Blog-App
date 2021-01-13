import React, { useContext, useEffect } from "react";
import Blogs from "../blogs/my-blogs/Blogs";
import AuthContext from "./../../context/auth/authContext";
import Footer from "./../layout/Footer";

const MyPosts = (props) => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Blogs history={props.history} />
      <Footer />
    </div>
  );
};

export default MyPosts;
