import imageThumbnail from "image-thumbnail";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createThumbnail = async (url, res) => {
  try {
    let options = { width: 50, height: 50 };
    const thumbnail = await imageThumbnail({ uri: url }, options);
    fs.writeFile("./modules/imageresized.png", thumbnail, (err) => {
      if (err) throw err;
      let fullPath = __dirname + "\\imageresized.png";
      res.sendFile(fullPath);
    });
  } catch (err) {
    console.error(err);
  }
};
