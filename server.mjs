import express from "express";
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello there");
});

app.listen(PORT, (err) => {
  console.log(`server started on port ${PORT}`);
});
