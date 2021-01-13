import React, { useReducer } from "react";
import axios from "axios";
import BlogContext from "./blogContext";
import blogReducer from "./blogReducer";
import {
  GET_BLOGS,
  GET_PERSONAL_BLOGS,
  ADD_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_BLOGS,
  FILTER_PERSONAL_BLOGS,
  CLEAR_FILTER,
  CLEAR_BLOGS,
  BLOG_ERROR,
} from "../types.js";

const BlogState = (props) => {
  const initialState = {
    blogs: null,
    personalBlogs: null,
    current: null,
    filtered: null,
    filteredPersonal: null,
    errors: null,
  };

  const [state, dispatch] = useReducer(blogReducer, initialState);

  //Get Blogs
  const getBlogs = async () => {
    try {
      const res = await axios.get("/api/blogs");
      dispatch({ type: GET_BLOGS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: BLOG_ERROR, payload: err.response.msg });
    }
  };
  //Get Personal Blogs
  const getPersonalBlogs = async () => {
    try {
      const res = await axios.get("/api/blogs/my-blogs");
      dispatch({ type: GET_PERSONAL_BLOGS, payload: res.data });
    } catch (err) {
      dispatch({ type: BLOG_ERROR, payload: err.response.msg });
    }
  };

  //Add Blog
  const addBlog = async (blog) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/blogs", blog, config);
      dispatch({ type: ADD_BLOG, payload: res.data });
    } catch (err) {
      dispatch({ type: BLOG_ERROR, payload: err.response });
    }
  };

  //Update Blogs
  const updateBlog = async (blog) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(`/api/blogs/${blog._id}`, blog, config);
      dispatch({ type: UPDATE_BLOG, payload: blog });
    } catch (err) {
      dispatch({ type: BLOG_ERROR, payload: err.response.msg });
    }
  };

  //Delete Blogs
  const deleteBlog = async (_id) => {
    try {
      await axios.delete(`/api/blogs/${_id}`);
      dispatch({ type: DELETE_BLOG, payload: _id });
    } catch (err) {
      dispatch({ type: BLOG_ERROR, payload: err.response.msg });
    }
  };

  //Set Current
  const setCurrent = (blog) => {
    dispatch({ type: SET_CURRENT, payload: blog });
  };

  //Clear Current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //Filter Blogs
  const filterPersonalBlogs = (text) => {
    dispatch({ type: FILTER_PERSONAL_BLOGS, payload: text });
  };
  const filterBlogs = (text) => {
    dispatch({ type: FILTER_BLOGS, payload: text });
  };
  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  //Clear Blogs
  const clearBlogs = () => {
    dispatch({ type: CLEAR_BLOGS });
  };
  return (
    <BlogContext.Provider
      value={{
        addBlog,
        setCurrent,
        clearCurrent,
        updateBlog,
        deleteBlog,
        getBlogs,
        getPersonalBlogs,
        clearBlogs,
        clearFilter,
        filterPersonalBlogs,
        filterBlogs,
        filtered: state.filtered,
        blogs: state.blogs,
        personalBlogs: state.personalBlogs,
        current: state.current,
        filteredPersonal: state.filteredPersonal,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
