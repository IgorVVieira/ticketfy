import multer from "multer";
import path from "path";
import crypto from "crypto";
import { S3Client } from "@aws-sdk/client-s3";
import "dotenv/config";
import multerS3 from "multer-s3";

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;
const STORAGE_TYPES = ["local", "s3"];

const s3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (error, hash) => {
        if (error) cb(error, file.filename);
        file.filename = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, file.filename);
      });
    },
  }),
  s3: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME || "",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (error, hash) => {
        if (error) cb(error, file.filename);
        file.filename = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, file.filename);
      });
    },
  }),
};

export default {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes["s3"],
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};
