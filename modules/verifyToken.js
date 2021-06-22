import jwt from "jsonwebtoken";

export const verifyToken = (req) => {
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
