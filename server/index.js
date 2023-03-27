const express = require("express");
const app = express();
const cors = require("cors");

// Middleware

function requestLogger(request, response, next) {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("---");
  next();
}

function unknowRoutes(request, response, next) {
  response.status(404).send({ error: "unknow endpoint" });
}

// Usefull Functions

function generateId() {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((item) => item.id)) : 0;
  return maxId + 1;
}

// Expand Our Express
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Data

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// Routes

// GET
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.send(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((item) => item.id.toString() === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// Unknow GET
app.use(unknowRoutes);

// Post
app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

// Delete
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((item) => item.id.toString() !== id);
  response.status(204).end();
});

// Port
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
