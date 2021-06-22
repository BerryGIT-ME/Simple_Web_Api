import jsonPatch from "jsonpatch";
import { patchInputs } from "../modules/valideInputs.js";
import { verifyToken } from "../modules/verifyToken.js";
import express from "express";
let router = express.Router();

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
    // do api stuff here
    if (error || patch === []) {
      // invalid inputs
      res.send({ message: "Please input valid data/patch arguments" });
    } else {
      let patchedDoc;
      // if inputs are valid
      try {
        patchedDoc = jsonPatch.apply_patch(data, patch);
      } catch (error) {
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
