import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BlogContext from "../../../context/blog/blogContext";
import BlogItems from "./BlogItems";
import "./Blogs.scss";

const Blogs = (props) => {
  const blogContext = useContext(BlogContext);
  const {
    personalBlogs,
    getPersonalBlogs,
    loading,
    filterPersonalBlogs,
    filteredPersonal,
    clearFilter,
  } = blogContext;

  const text = useRef("");

  useEffect(() => {
    getPersonalBlogs();
    // if (filteredPersonal === null) {
    //   text.current.value = "";
    // }
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== "") filterPersonalBlogs(e.target.value);
    else clearFilter();
  };

  if (personalBlogs !== null && personalBlogs.length === 0 && !loading) {
    return <h4>Please add a BLOG!</h4>;
  }

  return (
    <div>
      <div className="link__div">
        <Link className="link" to="/create-new">
          <i className="fas fa-plus"></i> Create Blog
        </Link>
        <form className="search__form">
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
      </div>
      <div>
        {personalBlogs !== null && personalBlogs.length > 0 ? (
          <>
            {filteredPersonal !== null
              ? filteredPersonal.map((blog) => (
                  <BlogItems
                    history={props.history}
                    key={blog.title}
                    blog={blog}
                  />
                ))
              : personalBlogs.map((blog) => (
                  <BlogItems
                    history={props.history}
                    key={blog.title}
                    blog={blog}
                  />
                ))}
          </>
        ) : (
          <h1>Lodaing...</h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;
