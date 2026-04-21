import fs from "node:fs";
import path from "node:path";

import multer from "multer";

import { env } from "../config/env.js";
import { createId } from "../lib/utils.js";

fs.mkdirSync(env.UPLOAD_DIR, {
  recursive: true
});

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => {
    callback(null, env.UPLOAD_DIR);
  },
  filename: (_request, file, callback) => {
    const extension = path.extname(file.originalname);
    callback(null, `${createId("file")}${extension}`);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024
  }
});
