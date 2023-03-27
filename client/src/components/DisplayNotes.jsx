import React, { useState, useEffect } from "react";

// Components
import Note from "./Note";

const DisplayNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      const data = await fetch("http://localhost:3030/api/notes");
      const result = await data.json();
      setNotes(result);
    }

    getNotes();
  }, []);

  return (
    <div className="notes">
      {notes.length === 0 ? (
        <h1>loading...</h1>
      ) : (
        notes.map((note) => (
          <Note
            content={note.content}
            important={note.important}
            key={note.id}
          />
        ))
      )}
    </div>
  );
};

export default DisplayNotes;
