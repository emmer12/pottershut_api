"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCert = void 0;
const http_status_1 = __importDefault(require("http-status"));
const PDFDocument = require("pdfkit");
const fs = require("fs");
const generateCert = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    let buffers = [];
    let pdfData;
    const doc = new PDFDocument({
        layout: "landscape",
        size: "A4",
    });
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
        pdfData = Buffer.concat(buffers);
        // const file = fs.readFileSync(path.join(__dirname, "../../", data.path));
        res.setHeader("Content-Disposition", 'attachment; filename="downloadedFile.pdf"');
        res.status(http_status_1.default.OK).send(pdfData);
        // ... now send pdfData as attachment ...
    });
    // Fit the image in the dimensions, and center it both horizontally and vertically
    // doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");
    doc
        .image("certificate.jpg", 0, 15, {
        width: doc.page.width,
        height: doc.page.height,
    })
        .font("Helvetica-Bold")
        .fontSize(32)
        .fillColor("#ac8750")
        .text(data.name, 0, doc.page.height / 1.8, {
        continued: true,
        width: doc.page.width,
        align: "center",
    });
    const file = fs.createWriteStream(data.path);
    doc.pipe(file);
    doc.end();
    return true;
});
exports.generateCert = generateCert;
