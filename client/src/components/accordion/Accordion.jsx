import React, { useState, useRef } from "react";
import "./Accordion.scss";

const Accordion = (props) => {
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

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <div className="accordion__title--container">
          <p className="accordion__title">{props.title}</p>
          <i className={`${setRotate} accordion__icon fas fa-chevron-down`}></i>
        </div>
        <p className="accordion__description">{props.description}</p>
        <p className="accordion__author">{props.author}</p>
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
      </div>
    </div>
  );
};

export default Accordion;
