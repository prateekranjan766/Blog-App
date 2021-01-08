import React, { useContext } from "react";
import BlogContext from "./../../../context/blog/blogContext";
import "./BlogItems.scss";

const BlogItems = (props) => {
  const blogContext = useContext(BlogContext);
  const { setCurrent, clearCurrent, deleteBlog } = blogContext;
  const { _id, title, description, data } = props.blog;

  const onEdit = () => {
    setCurrent(props.blog);
    props.history.push("/create-new");
    console.log(props);
  };

  const onDelete = () => {
    clearCurrent();
    deleteBlog(_id);
  };
  return (
    <div className="blog-items">
      <h1>
        {title}
        <span></span>
      </h1>
      <h3>
        {description}
        <span></span>
      </h3>
      <h4>{data}</h4>
      <button className="blog-items__edit" onClick={onEdit}>
        Edit
      </button>
      <button className="blog-items__delete" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default BlogItems;
