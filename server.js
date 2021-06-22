import jwt from "jsonwebtoken";
import joi from "joi";
import jsonPatch from "jsonpatch";
import express from "express";

// export for testing
export const app = express();
app.use(express.json());

// prototypes for validating inputs
const loginInputs = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

const patchInputs = joi.object({
  data: joi.object().required(),
  patch: joi.array().required(),
});

const thumbnailInputs = {};
const PORT = process.env.PORT || 3000;

app.post("/api/login", (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password,
  };

  // validate inputs
  let { error, value } = loginInputs.validate(user);
  if (error) {
    res.send("Please input a valid username/password");
  }

  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({ token });
  });
});

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

app.post("/api/patch", (req, res) => {
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
    if (error) {
      // invalid inputs
      res.send("Please input valid data/patch arguments");
    } else {
      // if inputs are valid
      let patchedDoc = jsonPatch.apply_patch(data, patch);
      res.send(patchedDoc);
    }
  } else {
    res.sendStatus(403);
  }
});

app.post("/api/thumbnail", (req, res) => {
  // validate token
  let tokenIsValid = verifyToken(req, res);

  //validate inputs

  if (tokenIsValid) {
    // do api stuff here
    res.send("authorized user");
  } else {
    res.sendStatus(403);
  }
});

app.listen(PORT, (err) => {
  console.log(`server started on port ${PORT}`);
});
