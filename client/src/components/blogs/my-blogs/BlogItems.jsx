import MyAccordion from "../../myAccordion/MyAccordion";
import "./BlogItems.scss";

const BlogItems = (props) => {
  const { _id, title, description, data } = props.blog;

  return (
    <div className="blog-items">
      <MyAccordion
        title={title}
        description={description}
        content={data}
        history={props.history}
        _id={_id}
        blog={props.blog}
      />

      {/* <button className="blog-items__edit" onClick={onEdit}>
        Edit
      </button>
      <button className="blog-items__delete" onClick={onDelete}>
        Delete
      </button> */}
    </div>
  );
};

export default BlogItems;
