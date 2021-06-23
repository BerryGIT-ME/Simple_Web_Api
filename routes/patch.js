import jsonPatch from "jsonpatch";
import express from "express";
import { patchInputs } from "../modules/valideInputs.js";
import { verifyToken } from "../modules/verifyToken.js";
import logger from "../logger/index.js";

let router = express.Router();

/**
 * @swagger
 * /api/patch:
 *    post:
 *      summary: Perform json Patching
 *      description: some api information
 *      responses:
 *        '200':
 *          description: some descripton about the response
 */
router.post("/", (req, res) => {
  // validate token
  let tokenIsValid = verifyToken(req, res);
  let data = req.body.data;
  let patch = req.body.patch;

  //validate inputs
  let { error, value } = patchInputs.validate({
    data: data,
    patch: patch,
  });

  if (tokenIsValid) {
    // check if data and patch inputs are of the correct format
    if (error || patch === []) {
      // invalid inputs
      res.send({ message: "Please input valid data/patch arguments" });
    } else {
      // valid inputs and authorized user
      let patchedDoc;
      try {
        patchedDoc = jsonPatch.apply_patch(data, patch);
      } catch (error) {
        logger.error(error);
        res.send({
          message:
            "an error occured while patching the document please ensure that the format is correct",
        });
      }

      res.send(patchedDoc);
    }
  } else {
    res.sendStatus(403);
  }
});

export default router;
