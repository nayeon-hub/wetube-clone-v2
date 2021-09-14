import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const loggerMiddleware = morgan("dev");

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  console.log("I will respond.");
  return res.send("Hello");
});
app.get("/login", (req, res) => {
  return res.send("Login there");
});

const handleListening = () =>
  console.log(`server Listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
