import express from "express";
import {
  registerUser,
  loginUser,
  getregisterUser,
  updateRegisterUser,
  deleteUser,
  getRegiterbyid,
  getLoginuser,
  deleteLoginuser,
  updateloginuser,
} from "../Controllers/user.controller.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getregister", getregisterUser);
router.post("/update/:id", updateRegisterUser);
router.delete("/delete/:id", deleteUser);
router.get("/getby/:id", getRegiterbyid);
router.get("/getlogin", getLoginuser);
router.delete("/deletelogin/:id", deleteLoginuser);
router.post("/update/:id", updateloginuser)
export default router;
