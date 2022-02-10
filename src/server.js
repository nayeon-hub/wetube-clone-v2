import express from "express";
// import morgan from "morgan";

const PORT = 4000;

const app = express(); // Create an Express application

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed<h1>");
  }
  console.log("Allowed, you may continue.");
  next();
};

const handleHome = (req, res) => {
  return res.send("Home");
};

const handleLogin = (req, res) => {
  return res.send({ message: "Login" });
};

const handleProtected = (req, res) => {
  return res.send("Welcome to the private lounge.");
};
app.use(logger);
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/login", handleLogin);
app.get("/protected", handleProtected);

const handleListening = () =>
  console.log(`✅ server Listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); // listen fob r connection

// get - http method 'hey get me your login page'
// http method how to work
// server is accepting request
// what is middleware?
