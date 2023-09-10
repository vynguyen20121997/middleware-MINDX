import express from "express";
import { upload } from "./Middleware/upload.js";
import fs from "fs";
const app = express();
const PORT = 3000;

app.post("/upload", upload.single("avatar"), async (req, res) => {
    try {
      fs.readFile(process.cwd() + "/" + req.file.path, (err, data) => {
        const base64Image = `data:${req.file.mimetype};base64,${Buffer.from(
          data
        ).toString("base64")}`;
        fs.unlinkSync(process.cwd() + "/" + req.file.path);
        res.json({
          message: "Upload image successfully",
          image: base64Image,
        });
      });
    } catch (err) {
      res.status(500).json({
              message: "Upload Failed"
          })
    }
  });
app.listen(PORT, (req,res) => {
    console.log(`sever listening ons PORT ${PORT}`);
});