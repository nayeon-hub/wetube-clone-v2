import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true }, // email, userNamme 은 딱 하나만 존재하도록(중복없음)
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

// mongoose middleware
// save password
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    // console.log("Users password:", this.password);
    this.password = await bcrypt.hash(this.password, 5);
    // console.log("Hashed password", this.password);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
