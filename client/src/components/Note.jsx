import React from "react";

const Note = ({ content, important }) => {
  return (
    <div
      className="note"
      style={{
        textDecoration: `${important ? "underline" : "none"}`,
      }}
    >
      {content}
    </div>
  );
};

export default Note;
