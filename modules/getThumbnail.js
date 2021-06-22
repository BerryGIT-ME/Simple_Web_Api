import imageThumbnail from "image-thumbnail";
import fs from "fs";
import path from "path";

export const createThumbnail = async (url, res) => {
  try {
    let options = { width: 50, height: 50 };
    const thumbnail = await imageThumbnail({ uri: url }, options);
    fs.writeFile("./thumbnails/imageResized.png", thumbnail, (err) => {
      if (err) throw err;
      res.sendFile(path.resolve("./thumbnails/imageResized.png"));
    });
  } catch (err) {
    console.error(err);
  }
};
