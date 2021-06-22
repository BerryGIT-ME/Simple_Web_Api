import express from "express";
import login from "./routes/login.js";
import thumbnail from "./routes/thumbnail.js";
import patch from "./routes/patch.js";

// export for testing
export const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/login", login);
app.use("/api/patch", patch);
app.use("/api/thumbnail", thumbnail);

app.listen(PORT, (err) => {
  console.log(`server started on port ${PORT}`);
});
