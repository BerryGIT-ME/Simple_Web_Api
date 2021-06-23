import jwt from "jsonwebtoken";
import { loginInputs } from "../modules/valideInputs.js";
import express from "express";
let router = express.Router();

/**
 * @swagger
 * /api/login:
 *    post:
 *      summary: Validate username and password
 *      description: Accepts a valid username and password an inputs and
 *         returns a json web token to authorize all future request
 *      requestBody:
 *        description: accepts a valid username and password
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *      responses:
 *        '200':
 *          description: some descripton about the response
 */
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
