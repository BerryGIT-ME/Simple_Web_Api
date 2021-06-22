import jwt from "jsonwebtoken";
import { loginInputs } from "../modules/valideInputs.js";
import express from "express";
let router = express.Router();

router.post("/", (req, res) => {
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

export default router;
