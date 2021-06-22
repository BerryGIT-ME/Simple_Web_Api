import express from "express";
import api from "./routes/api.js";

// export for testing
export const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/", api);

app.listen(PORT, (err) => {
  console.log(`server started on port ${PORT}`);
});
