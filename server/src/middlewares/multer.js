import multer from "multer";

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public"); // Specify the destination folder for uploaded files here cb is a callback function that is used to pass the destination folder to the next middleware
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.originalname; // Generate a unique filename using the current timestamp and original filename
    cb(null, filename); //here calback is used to pass the filename to the next middleware
  },
});
// Create the multer instance with the defined storage configuration
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}); // Set a file size limit of 5MB

//public folder is used to store files and AI agent will access the files from this folder and it should be accessible to the client as well so that we can display the files in the client side if needed
