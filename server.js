// npm packages
import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swagggerUi from "swagger-ui-express";
//
import login from "./routes/login.js";
import thumbnail from "./routes/thumbnail.js";
import patch from "./routes/patch.js";
import logger from "./logger/index.js";

// export for testing purposes
export const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// initialize swagger for api documentaion
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "simple web api",
      description: "Simple web API to demonstrate the power of json web tokens",
      contact: {
        name: "Ikechukwu Okerenwogba",
        linkedin: "linkedin.com/in/ikechukwu-okerenwogba-1478b711a",
        email: "ike.okerenwogba@gmail.com",
      },
      servers: `http://localhost:${PORT}`,
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swagggerUi.serve, swagggerUi.setup(swaggerDocs));
// end swagger initialization

// define routes
app.use("/api/login", login);
app.use("/api/patch", patch);
app.use("/api/thumbnail", thumbnail);

app.listen(PORT, (err) => {
  logger.info(`server started on port ${PORT}`);
});
