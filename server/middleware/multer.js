const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({ storage });

const multerUpload = {
    single: (name) => {
       return upload.single(name)
    }
    
}
module.exports= multerUpload