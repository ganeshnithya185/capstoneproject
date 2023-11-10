import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  booktitle: String,
  authorname: String,
  bookdescription: String,
  bookimage: String,
});
const Book = mongoose.model("Book", bookSchema);
export default Book;
