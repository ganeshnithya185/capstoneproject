import User from "../Models/user.Schema.js";
import bcrypt from "bcryptjs";
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
export const getRegiterbyid = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the ID is provided in the URL params
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getregisterUser = async (req, res) => {
  try {
    const Register = await User.find();
    console.log(Register);
    res.status(200).json({
      message: "Register user details got successfully",
      data: Register,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateRegisterUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const updateuser = await User.findByIdAndUpdate(id, { email });
    if (!updateuser) {
      res.status(401).json({ message: "Not updated " });
    }
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received user ID:", id);
    const deleteuser = await User.findByIdAndDelete(id);
    if (!deleteuser) {
      res.status(401).json({ message: "Not deleted Succesfully" });
    }
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(501).json({ message: error.message });
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
    res.status(500).json({ error: "Reegister Failed" });
  }
};

export const getLoginuser = async (req, res) => {
  try {
    const getuser = await User.find();

    res.status(200).json({ getuser });
  } catch (error) {
    res.status(500).json({ error: message.error });
  }
};

export const updateloginuser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, token } = req.body; // Assuming token is sent in the request body

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Extract the user ID from the decoded token
    const userId = decodedToken._id;

    // Check if the user ID from the token matches the ID in the request params
    if (userId !== id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update the user's email
    const updateUser = await User.findByIdAndUpdate(
      id,
      { email },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updateUser, token });
  } catch (error) {
    // Handle token verification errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteLoginuser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      res.status(400).json({ message: "Not Deleted" });
    }
    res.status(200).json({ message: "Deteled Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
