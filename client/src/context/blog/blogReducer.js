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
} from '../types.js';

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return { ...state, blogs: action.payload, loading: false };
    case GET_PERSONAL_BLOGS:
      return { ...state, personalBlogs: action.payload, loading: false };
    case ADD_BLOG:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        loading: false,
      };

    case UPDATE_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        ),
        personalBlogs: state.personalBlogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        ),
        loading: false,
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload),
        personalBlogs: state.personalBlogs.filter(
          (blog) => blog._id !== action.payload
        ),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case CLEAR_BLOGS:
      return {
        ...state,
        current: null,
        blogs: [],
        personalBlogs: [],
        errors: null,
      };
    case FILTER_PERSONAL_BLOGS:
      return {
        ...state,
        filteredPersonal: state.personalBlogs.filter((blog) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return blog.title.match(regex);
        }),
      };
    case FILTER_BLOGS:
      return {
        ...state,
        filtered: state.blogs.filter((blog) => {
          // const regex = new RegExp(`${action.payload}`, "gi");

          return blog.title
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        filteredPersonal: null,
      };
    case BLOG_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
