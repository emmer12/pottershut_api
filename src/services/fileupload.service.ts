import formidable from "formidable";
import express from "express";
import fs from "fs";
import path from "path";
import { allowed_file_size, array_of_allowed_img_file_types, array_of_allowed_img_files } from "../utils";
import config from "../config/config";

export const readFile = (
  req: express.Request,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "public/uploads/files");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  const form = new formidable.IncomingForm(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      console.log(err, fields, files);
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export const handleSingleFile = (
  req: express.Request,
  saveLocally?: boolean,
  collection_name?: string
): Promise<{ file_path: string }> => {
  const file = req.files[0];
  let options: any = {};
  if (saveLocally) {
    const dir = "uploads/files";

    const uploadDir = path.join(process.cwd(), "public/uploads/images/");
    const filename = Date.now().toString() + "_" + file.originalname;
    options.uploadPath = uploadDir + "/" + filename;
    options.path = dir + "/" + filename;
  }
  const fileStream = fs.createWriteStream(options.uploadPath);
  fileStream.write(file.buffer);
  fileStream.end();

  // Handle the 'finish' event when the file write is complete

  return new Promise((resolve, reject) => {
    fileStream.on("finish", () => {
      resolve({ file_path: options.path });
    });

    fileStream.on("error", (err) => {
      reject(err);
    });
  });
};


export const handleSingleImage = (
  req: express.Request,
  saveLocally?: boolean,
  collection_name?: string,
  visibility: 'private' | 'public' = "public",

): Promise<{ file_path: string }> => {
  const file = req.files[0];
  let options: any = {};
  if (saveLocally) {
    const dir = collection_name ? "uploads/" + collection_name : "uploads";
    const uploadDir = visibility == 'public' ? path.join(process.cwd(), `public/${dir}`) : path.join(process.cwd(), `storage/${dir}`);
    const filename = Date.now().toString() + "_" + file.originalname;
    options.uploadPath = uploadDir + "/" + filename;
    options.path = dir + "/" + filename;
  }
  const fileStream = fs.createWriteStream(options.uploadPath);
  fileStream.write(file.buffer);
  fileStream.end();

  // Handle the 'finish' event when the file write is complete

  return new Promise((resolve, reject) => {
    fileStream.on("finish", () => {
      resolve({ file_path: options.path });
    });

    fileStream.on("error", (err) => {
      reject(err);
    });
  });
};

export const handleMultipleFile = (
  req: express.Request,
  saveLocally?: boolean,
  collection_name?: string,
  visibility: 'private' | 'public' = "public",
): Promise<any[]> => {
  const files = req.files;
  let paths = [];

  const isValidated: boolean = validateFiles(files);
  if (!isValidated) return Promise.reject("Invalid file type");

  files.map((file) => {
    let options: any = {};
    if (saveLocally) {
      const dir = collection_name ? "uploads/" + collection_name : "uploads";

      const uploadDir = visibility == 'public' ? path.join(process.cwd(), `public/${dir}`) : path.join(process.cwd(), `storage/${dir}`);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filename = Date.now().toString() + "_" + file.originalname;
      options.uploadPath = uploadDir + "/" + filename;
      options.path = dir + "/" + filename;
    }
    const fileStream = fs.createWriteStream(options.uploadPath);
    fileStream.write(file.buffer);
    fileStream.end();

    new Promise((resolve, reject) => {
      fileStream.on("finish", () => {
        resolve({ file_path: options.path });
      });

      fileStream.on("error", (err) => {
        reject(err);
      });

      paths.push({
        file_path: options.path,
        mime_type: file.mimetype,
        full_url: `${config.server_url}/${options.path}`
      });
    });
  });

  return Promise.resolve(paths);

  // Handle the 'finish' event when the file write is complete
};


const validateFiles = (files: any[]) => {
  let hasError = false
  files.map((image) => {
    const file_extension = image.originalname.slice(
      ((image.originalname.lastIndexOf('.') - 1) >>> 0) + 2
    )

    // Check if the uploaded file is allowed
    if (!array_of_allowed_img_files.includes(file_extension)) {
      hasError = true;
    }

    if ((image.size / (1024 * 1024)) > allowed_file_size) {
      hasError = true;
    }
  })

  return hasError ? false : true;
}


const getSize = (path) => {
  var stats = fs.statSync(path)
  var fileSizeInBytes = stats.size;
  var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);


  return fileSizeInMegabytes + 'MB'
}