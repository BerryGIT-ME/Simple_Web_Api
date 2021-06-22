import jwt from "jsonwebtoken";
import jsonPatch from "jsonpatch";
import { createThumbnail } from "../modules/thumbnail.js";
import {
  loginInputs,
  patchInputs,
  thumbnailInputs,
} from "../modules/valideInputs.js";
import express from "express";
let router = express.Router();

const verifyToken = (req) => {
  //retrieve token from the headers
  let valid = false;
  req.token = req.headers["authorization"];
  if (req.token) {
    // if a token was supplied in the req headers, verify that token
    jwt.verify(req.token, "secretkey", (err, data) => {
      if (err) {
        valid = false;
      } else {
        valid = true;
      }
    });
  } else {
    valid = false;
  }

  return valid;
};

router.post("/login", (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password,
  };

  // validate inputs
  let { error, value } = loginInputs.validate(user);
  if (error) {
    res.send({ message: "Please input a valid username/password" });
  }

  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({ token });
  });
});

router.post("/patch", (req, res) => {
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

router.post("/thumbnail", (req, res) => {
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
