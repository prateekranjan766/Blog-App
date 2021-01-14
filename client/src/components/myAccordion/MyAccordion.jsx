import React, { useState, useRef, useContext } from "react";
import BlogContext from "./../../context/blog/blogContext";
import "./MyAccordion.scss";

const MyAccordion = (props) => {
  const blogContext = useContext(BlogContext);
  const { setCurrent, clearCurrent, deleteBlog } = blogContext;
  const { _id, blog } = props;
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight + 15}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  const onEdit = () => {
    setCurrent(blog);
    props.history.push("/create-new");
  };

  const onDelete = () => {
    clearCurrent();
    deleteBlog(_id);
  };

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <div className="accordion__title--container">
          <p className="accordion__title">{props.title}</p>
          <i className={`${setRotate} accordion__icon fas fa-chevron-down`}></i>
        </div>
        <p className="accordion__description">{props.description}</p>
      </button>
      <div
        className="accordion__content"
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
      >
        <div
          className="accordion__text"
          style={{ whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></div>
        <div className="buttons">
          <button className="blog-items__edit" onClick={onEdit}>
            <i className="fas fa-pencil-alt"></i>Edit
          </button>
          <button className="blog-items__delete" onClick={onDelete}>
            <i className="fas fa-trash"></i>Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAccordion;
