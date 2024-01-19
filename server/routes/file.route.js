const express = require("express");
const fileController = require("../controller/file.controller");
const multerUpload = require("../middleware/multer");
const authMiddleware = require("../middleware/authorization");

const router = express.Router();

router.post("/upload",authMiddleware, multerUpload.single('file'), fileController.uploadFile);
router.get("/get-all", authMiddleware, fileController.getAllFiles);
router.delete("/delete/:id", authMiddleware, fileController.deleteFileById);


module.exports = router;
