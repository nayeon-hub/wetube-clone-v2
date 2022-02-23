import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError); // error event 만약 에러 이벤트가 발생한다면(여러번 발생)
db.once("open", handleOpen); // 오로지 한번만 발생함

// very very big important file
// db를 mongoose와 연결시켜서 video model(./models/Video.js)를 인식시키는 것
