import imageThumbnail from "image-thumbnail";
import fs from "fs";
import path from "path";
import logger from "../logger/index.js";

export const createThumbnail = async (url, res) => {
  try {
    // set image resize size
    let options = { width: 50, height: 50 };
    const thumbnail = await imageThumbnail({ uri: url }, options);

    fs.writeFile("./thumbnails/imageResized.png", thumbnail, (err) => {
      if (err) throw err;
      res.sendFile(path.resolve("./thumbnails/imageResized.png"));
    });
  } catch (err) {
    // perhaps no internet connectivity
    logger.error(err);
    res.send({
      message: "An Error Occured while trying to process your request",
    });
  }
};
