import React, { useContext, useEffect, useRef } from "react";
import BlogContext from "../../context/blog/blogContext";
import BlogItems from "./BlogItems";

const Blogs = () => {
  const blogContext = useContext(BlogContext);
  const {
    blogs,
    getBlogs,
    loading,
    filtered,
    filterBlogs,
    clearFilter,
  } = blogContext;

  const text = useRef("");

  useEffect(() => {
    getBlogs();
    // if (filtered === null) {
    //   text.current.value = "";
    // }
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== "") filterBlogs(e.target.value);
    else clearFilter();
  };

  if (blogs !== null && blogs.length === 0 && !loading) {
    return <h4>Please add a BLOG!</h4>;
  }

  return (
    <>
      <form
        className="search__form"
        style={{ margin: "auto", marginBottom: "3rem" }}
      >
        <label className="search__form__label">
          <i className="fas fa-search" />
          <input
            className="search__bar"
            type="text"
            ref={text}
            name={text}
            placeholder="Search for Blog title"
            onChange={onChange}
          />
        </label>
      </form>
      <div>
        {blogs !== null && !loading ? (
          <>
            {filtered !== null
              ? filtered.map((blog) => (
                  <BlogItems key={blog.title} blog={blog} />
                ))
              : blogs.map((blog) => <BlogItems key={blog.title} blog={blog} />)}
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default Blogs;
