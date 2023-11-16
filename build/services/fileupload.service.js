"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMultipleFile = exports.handleSingleImage = exports.handleSingleFile = exports.readFile = void 0;
const formidable_1 = __importDefault(require("formidable"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readFile = (req, saveLocally) => {
    const options = {};
    if (saveLocally) {
        options.uploadDir = path_1.default.join(process.cwd(), "public/uploads/files");
        options.filename = (name, ext, path, form) => {
            return Date.now().toString() + "_" + path.originalFilename;
        };
    }
    const form = new formidable_1.default.IncomingForm(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            console.log(err, fields, files);
            if (err)
                reject(err);
            resolve({ fields, files });
        });
    });
};
exports.readFile = readFile;
const handleSingleFile = (req, saveLocally) => {
    const file = req.files[0];
    let options = {};
    if (saveLocally) {
        const dir = "uploads/files";
        const uploadDir = path_1.default.join(process.cwd(), "public/uploads/files");
        const filename = Date.now().toString() + "_" + file.originalname;
        options.uploadPath = uploadDir + "/" + filename;
        options.path = dir + "/" + filename;
    }
    const fileStream = fs_1.default.createWriteStream(options.uploadPath);
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
exports.handleSingleFile = handleSingleFile;
const handleSingleImage = (req, saveLocally) => {
    const file = req.files[0];
    let options = {};
    if (saveLocally) {
        const dir = "uploads/images";
        const uploadDir = path_1.default.join(process.cwd(), "public/uploads/images");
        const filename = Date.now().toString() + "_" + file.originalname;
        options.uploadPath = uploadDir + "/" + filename;
        options.path = dir + "/" + filename;
    }
    const fileStream = fs_1.default.createWriteStream(options.uploadPath);
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
exports.handleSingleImage = handleSingleImage;
const handleMultipleFile = (req, saveLocally) => {
    const files = req.files;
    let paths = [];
    files.map((file) => {
        let options = {};
        if (saveLocally) {
            const dir = "uploads/files";
            const uploadDir = path_1.default.join(process.cwd(), "public/uploads/files");
            const filename = Date.now().toString() + "_" + file.originalname;
            options.uploadPath = uploadDir + "/" + filename;
            options.path = dir + "/" + filename;
        }
        const fileStream = fs_1.default.createWriteStream(options.uploadPath);
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
                field: file.fieldname,
                file_path: options.path,
            });
        });
    });
    return Promise.resolve(paths);
    // Handle the 'finish' event when the file write is complete
};
exports.handleMultipleFile = handleMultipleFile;
