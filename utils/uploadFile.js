const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const timestamp = Date.now().toString();
    const hashedFileName = generateHashedFileName(file.originalname, timestamp);
    return {
      key: `Lattice${hashedFileName}`,
      Body: file.buffer,
      ContentType: file.mimetype
    };
  }
});

// Initialize multer instance with Cloudinary storage
const upload = multer({ storage });

function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
    // .end(file.buffer);
  });
}

// Function to generate a hashed file name
function generateHashedFileName(fileName, timestamp) {
  const hash = crypto.createHash('sha256');
  hash.update(fileName + timestamp);

  const hashedFileName = hash.digest('hex');
  const fileExtension = path.extname(fileName);
  const finalFileName = hashedFileName + fileExtension;

  return finalFileName;
}

module.exports = {
  upload,
  generateHashedFileName,
  uploadToCloudinary,
};
