const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const FileModel = require("../model/file.model");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const fileController = {
  uploadFile: async (req, res) => {
    try {
      console.log("enter in the controller")
      const fileBuffer = req.file.buffer;
      const timestamp = new Date().getTime();
      const uniqueId = Math.floor(Math.random() * 100000);
      const publicId = `image_${timestamp}_${uniqueId}`;

      const generateRandomId = () => {
        const timestamp = new Date().getTime();
        const randomPart = Math.floor(Math.random() * 900000) + 100000;
        const uniqueId = `${timestamp}${randomPart}`;
        return uniqueId.slice(-6);
      };

      cloudinary.uploader
        .upload_stream(
          {
            public_id: publicId,
            folder: "imageuploadtesting",
          },
          async (err, result) => {
            if (err) {
              throw err;
            } else {
              console.log(result)
              const newfile = await FileModel.create({
                uniqueKey_6_digit: generateRandomId(),
                url: result.url,
                format: result.format
              });

              res
                .status(201)
                .json({ message: "file uploaded successfully", file: newfile });
            }
          }
        )
        .end(fileBuffer);
    } catch (error) {
      res.json({ message: "Error: " + error.message });
    }
  },

  getAllFiles: async (req,res) => {
      try {
        const files = await FileModel.find();
        res.status(200).json(files)
  } catch(error) {
        throw error
  }
  },
  deleteFileById:async (req, res) => {
  const fileId = req.params.id;

    try {
    console.log('enter in controller')
  
    const file = await FileModel.findById(fileId);

    if (!file) {
      throw 'File not found'
     
    }
    await FileModel.findByIdAndDelete(fileId);
    res.status(200).json({ message: 'File deleted successfully' });

  } catch (error) {
    throw error;
  }
}
};

module.exports = fileController;
