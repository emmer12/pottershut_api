import httpStatus from "http-status";
import path from "path";
const PDFDocument = require("pdfkit");
const fs = require("fs");

export const generateCert = async (data: any, res) => {
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

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="downloadedFile.pdf"'
    );
    res.status(httpStatus.OK).send(pdfData);
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
};
