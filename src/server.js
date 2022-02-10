import express from "express";
import morgan from "morgan"; // middleware

const PORT = 4000;

const app = express(); // Create an Express application
const logger = morgan("dev");

const home = (req, res) => {
  return res.send("Home");
};

const login = (req, res) => {
  return res.send(login);
};

app.use(logger);
app.get("/", home);
app.get("/login", login);

const handleListening = () =>
  console.log(`✅ server Listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); // listen fob r connection

// get - http method 'hey get me your login page'
// http method how to work
// server is accepting request
// what is middleware?

// middleware => morgan,
