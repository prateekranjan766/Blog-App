import React, { useState, useContext, useEffect, useRef } from "react";
import BlogContext from "./../../context/blog/blogContext";
import "./CreatePost.scss";
import AuthContext from "./../../context/auth/authContext";
import Footer from "./../layout/Footer";

const CreatePost = (props) => {
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);

  const textAreaRef = useRef("");
  const [textAreaHeight, setTextAreaHeight] = useState(100);

  const { addBlog, updateBlog, current, clearCurrent } = blogContext;

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    data: "",
  });

  useEffect(() => {
    authContext.loadUser();
    if (current !== null) {
      setBlog(current);
    } else {
      setBlog({
        title: "",
        description: "",
        data: "",
      });
    }
  }, [current]);

  const onChange = (e) => {
    setTextAreaHeight(textAreaRef.current.scrollHeight);
    if (e.target.name === "title") {
      setBlog({ ...blog, [e.target.name]: e.target.value.substr(0, 210) });
    } else if (e.target.name === "description") {
      setBlog({ ...blog, [e.target.name]: e.target.value.substr(0, 260) });
    } else {
      setBlog({ ...blog, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (current !== null) {
      updateBlog(blog);
    } else {
      addBlog(blog);
    }
    clearCurrent();
    props.history.push("/all-posts");
  };
  return (
    <>
      <div className="create-post">
        <h1>{current !== null ? "Update Blog" : "Create a new Blog"}</h1>
        <form onSubmit={onSubmit}>
          <label>
            <i className="fas fa-pencil-alt"></i>
            <input
              type="text"
              name="title"
              value={blog.title}
              placeholder="Title"
              onChange={onChange}
              required
            />
          </label>
          <label>
            <i className="fas fa-newspaper"></i>
            <input
              type="text"
              name="description"
              value={blog.description}
              placeholder="Description"
              onChange={onChange}
            />
          </label>
          <label>
            {/* <i className="far fa-file-alt"></i> */}
            <textarea
              style={{ height: "20rem" }}
              ref={textAreaRef}
              style={{ height: textAreaHeight }}
              type="text"
              name="data"
              value={blog.data}
              placeholder="Write your blog here..."
              onChange={onChange}
              required
            />
          </label>
          <input
            className="create-post__submit"
            type="submit"
            value={current !== null ? "Update" : "Submit"}
          />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
