import { thumbnailInputs } from "../modules/valideInputs.js";
import { createThumbnail } from "../modules/getThumbnail.js";
import { verifyToken } from "../modules/verifyToken.js";
import express from "express";
let router = express.Router();

router.post("/", (req, res) => {
  let url = req.body.url;
  // validate token
  let tokenIsValid = verifyToken(req, res);

  //validate inputs

  if (tokenIsValid) {
    // do api stuff here
    // validate input
    let firstFour;
    let { error, value } = thumbnailInputs.validate(url);
    if (!error) {
      // all valid url will begin with http
      firstFour = url.slice(0, 4);
    }

    if (error || firstFour !== "http") {
      // url not a valid string
      res.send({ message: "please send a valid url" });
    } else {
      // valid token and input fields
      createThumbnail(url, res);
    }
  } else {
    res.sendStatus(403);
  }
});

export default router;
