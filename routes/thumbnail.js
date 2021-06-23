import { thumbnailInputs } from "../modules/valideInputs.js";
import { createThumbnail } from "../modules/getThumbnail.js";
import { verifyToken } from "../modules/verifyToken.js";
import express from "express";
let router = express.Router();

/**
 * @swagger
 * /api/thumbnail:
 *    post:
 *      summary: Create a 50x50 thumbnail
 *      description: some api information
 *      responses:
 *        '200':
 *          description: some descripton about the response
 */
router.post("/", (req, res) => {
  let url = req.body.url;
  // validate token
  let tokenIsValid = verifyToken(req, res);

  if (tokenIsValid) {
    // validate input
    let { error, value } = thumbnailInputs.validate(url);
    let firstFour;
    if (!error) {
      //if input is a valid string, check if the string contains the letters 'http'
      firstFour = url.slice(0, 4);
    }

    if (error || firstFour !== "http") {
      // url is not a valid string
      res.send({ message: "please send a valid url" });
    } else {
      // valid token and valid url
      createThumbnail(url, res);
    }
  } else {
    res.sendStatus(403);
  }
});

export default router;
