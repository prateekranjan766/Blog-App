import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BlogContext from "../../../context/blog/blogContext";
import BlogItems from "./BlogItems";
import "./Blogs.scss";
import Loading from "./../../loading/Loading";

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
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== "") filterPersonalBlogs(e.target.value);
    else clearFilter();
  };

  if (personalBlogs !== null && personalBlogs.length === 0 && !loading) {
    return (
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
    );
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
          <div className="blogs">
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
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Blogs;
