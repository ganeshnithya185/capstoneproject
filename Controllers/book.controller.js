import Book from "../Models/book.Schema.js";
import dotenv from "dotenv";
dotenv.config();
export const createBooks = async (req, res) => {
  try {
    const bookitem = new Book(req.body);
    await bookitem.save();

    res
      .status(200)
      .json({ message: "Successfully added bookitems", data: bookitem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getbooks = async (req, res) => {
  try {
    const bookitem = await Book.find();
    res.status(200).json({ message: bookitem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getbooksbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Book.findById(id);
    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBooks = await Book.findByIdAndDelete(id);
    if (!deleteBooks) {
      return res.status(404).json({ message: "Not deleted bookitem" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatebooks = async (req, res) => {
  try {
    const { id } = req.params;

    const { bookname, booktitle, authorname, bookdescription, bookimage } =
      req.body;
    const updatebooks = await Book.findByIdAndUpdate(id, {
      booktitle,
      authorname,
      bookdescription,
      bookimage,
    });
    if (!updatebooks) {
      res.status(404).json({ message: "Not updated books" });
    }
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
