import express from "express";
import morgan from "morgan"; // middleware
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// console.log(process.cwd()); package.json에서 node.js를 실행하고 있기 때문에 package.json이 있는 디렉토리가 기준이 된다.

const app = express(); // Create an Express application
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Hello!", // 암호화
    resave: true, // 세션을 항상 저장할지 여부를 정하는 값(false 권장)
    saveUninitialized: true, // 초기화되지 않은 채 스토어에 저장되는 세션
  })
); // 사이트에 들어오는 모두를 기억함

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

app.get("/add-one", (req, res, next) => {
  // 서버에서 세션에 접근하려면 req.session을 이용한다.
  return res.send(`${req.session.id}`); //
  // 브라우저가 서버에게 로그인을 요청할 때, 로그인이 성공한다면 서버는 브라우저에게 session.id(고유)를 줍니다. => cookie
});

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

// get - http method 'hey get me your login page'
// http method how to work
// server is accepting request
// what is middleware?

// middleware => morgan,

export default app;
