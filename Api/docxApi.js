const apiRouter = require("express").Router();
const multer = require("multer");
const fs = require("fs");
var path = require("path");
const upload = multer({ dest: "uploads/" });
const docx = require("docx");
const { Document, ImageRun, Packer, Paragraph } = docx;

apiRouter.post("/img/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  let date = new Date().toString().split(" ").join("").split("+");
  date = date[0].toString().split(":").join("");
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph("Image file inserted into a docx file"),
          new Paragraph({
            children: [
              new ImageRun({
                data: fs.readFileSync(req.file.path),
                transformation: {
                  width: 500,
                  height: 500,
                },
              }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(date + ".docx", buffer);
    res.sendFile(date + ".docx", {
      root: path.join(__dirname, "../"),
    });
    console.log("Document created successfully");
  });
});

apiRouter.post("/img/uploads", upload.array("image"), (req, res) => {
  const images = req.files;
  let date = new Date().toString().split(" ").join("").split("+");
  date = date[0].toString().split(":").join("");

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          images.forEach((img) => {
            console.log(img.path);
            new Paragraph("Hello World"),

            new Paragraph({
              children: [
                new ImageRun({
                  data: fs.readFileSync(img.path),
                  transformation: {
                    width: 500,
                    height: 500,
                  }
                }),
              ],
            });
          }),
        ],
      },
    ],
  });
  // console.log(doc);
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(date + ".docx", buffer);
    res.sendFile(date + ".docx", {
      root: path.join(__dirname, "../"),
    });
    console.log("Document created successfully");
  });
});

module.exports = apiRouter;
