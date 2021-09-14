import express from "express";

const PORT = 4000;

const app = express();

const gossipMiddleware = (req, res, next) => {
  console.log(`Someone is going to:${req.url}`);
  next();
};

app.get("/", gossipMiddleware, (req, res) => {
  return res.send("I love middleware");
});

app.get("/login", (req, res) => {
  return res.send("Login there");
});

const handleListening = () =>
  console.log(`server Listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
