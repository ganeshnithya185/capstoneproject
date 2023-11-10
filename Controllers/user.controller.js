import User from "../Models/user.Schema.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashpassword });
    newUser.save();
    res
      .status(200)
      .json({ message: "User Registered successfully", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Register failed" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    const passwordmatch = await bcrypt.hash(password, user.password);
    if (!passwordmatch) {
      res.status(401).json({ message: "Invalid User" });
    }
    const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login Successfully", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Register failed" });
  }
};