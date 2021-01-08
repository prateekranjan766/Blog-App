import React, { useState, useContext, useEffect } from "react";
import BlogContext from "./../../context/blog/blogContext";
import "./CreatePost.scss";

const CreatePost = (props) => {
  const blogContext = useContext(BlogContext);
  const { addBlog, updateBlog, current, clearCurrent } = blogContext;
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    data: "",
  });

  useEffect(() => {
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

  const onChange = (e) => setBlog({ ...blog, [e.target.name]: e.target.value });
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
  );
};

export default CreatePost;
