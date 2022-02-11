import express from "express";
import morgan from "morgan"; // middleware
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express(); // Create an Express application
const logger = morgan("dev");

app.use(logger);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () =>
  console.log(`✅ server Listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); // listen fob r connection

// get - http method 'hey get me your login page'
// http method how to work
// server is accepting request
// what is middleware?

// middleware => morgan,
