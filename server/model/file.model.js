const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  uniqueKey_6_digit: { type: String, unique: true, required: true },
  url: { type: String, required: true },
  format: { type: String, required: true },
});

const FileModel = mongoose.model("File", fileSchema);

module.exports =FileModel;
