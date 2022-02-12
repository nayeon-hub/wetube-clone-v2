import "./db"; //db 파일 자체를 import함과 동시에 js에 의해 자동으로 파일이 실행됨
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ server Listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); // listen fob r connection

// init.js는 필요한 모든 것들을 import 시키는 역할을 담당한다.
