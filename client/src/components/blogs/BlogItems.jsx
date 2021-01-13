import Accordion from "./../accordion/Accordion";

const BlogItems = ({ blog }) => {
  const { title, description, data, user } = blog;
  return (
    <div className="blog-items">
      <Accordion
        title={title}
        author={`-  ${user.name}`}
        description={description}
        content={data}
      />
    </div>
  );
};

export default BlogItems;
