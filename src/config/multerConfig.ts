import multer from "multer";
import path from "path";

// Set storage engine
//post Picture Config
const postStorage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "public/uploads/posts/"); // Store files in "uploads" folder
  },
  filename: (req, files, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, files.fieldname + "-" + uniqueSuffix + path.extname(files.originalname));
  },
});

// File filter to allow only specific types
const postFileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileTypes = /jpeg|jpg|png|gif|mp4/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    return cb(new Error("Invalid file type. Only images and videos are allowed!"));
  }
};

// Initialize multer
export const postsUpload = multer({
  storage:postStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter:postFileFilter
  
});

//profilePicture Config
const profileStorage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, "public/uploads/profile/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },

});

const profileFileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    return cb(new Error("Invalid file type. Only images are allowed!"));
  }
};

export const profileUpload = multer({
  storage:profileStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: profileFileFilter,
});

//story Media Config
const storyStorage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "public/uploads/posts/"); // Store files in "uploads" folder
  },
  filename: (req, files, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, files.fieldname + "-" + uniqueSuffix + path.extname(files.originalname));
  },
});

// File filter to allow only specific types
const storyFileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileTypes = /jpeg|jpg|png|gif|mp4/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    return cb(new Error("Invalid file type. Only images and videos are allowed!"));
  }
};

// Initialize multer
export const storyUpload = multer({
  storage:postStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter:postFileFilter
  
});
