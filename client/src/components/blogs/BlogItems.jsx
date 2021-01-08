const BlogItems = ({ blog }) => {
  const { title, description, data } = blog;
  return (
    <div className="blog-items">
      {/* <h1>
        <i className="fas fa-user-circle"></i>
        <span></span>
      </h1> */}
      <h1>
        {title}
        <span></span>
      </h1>
      <h3>
        Description:- {description}
        <span></span>
      </h3>
      <h4>{data}</h4>
    </div>
  );
};

export default BlogItems;
