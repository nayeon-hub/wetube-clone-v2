import express from "express";

const PORT = 4000;

const app = express();

const routerLogger = (req, res, next) => {
  console.log("PATH", req.path);
  next();
};

const methodLogger = (req, res, next) => {
  console.log("METHOD", req.method);
  next();
};
app.use(methodLogger, routerLogger);
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
