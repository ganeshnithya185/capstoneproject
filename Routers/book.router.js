import express from "express";
import {
  createBooks,
  deleteBooks,
  getbooks,
  getbooksbyId,
  updatebooks,
} from "../Controllers/book.controller.js";

const router = express.Router(); // Change this line to use bookrouter
router.post("/create", createBooks);
router.get("/get", getbooks);
router.get("/get/:id", getbooksbyId);
router.delete("/delete/:id", deleteBooks);
router.put("/update/:id", updatebooks)
export default router; // Change this line to export bookrouter
