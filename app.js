var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: `3.0.0`,
    info: {
      title: `Recuperacion Prueba Esteban Revelo`,
      version: `1.0.0`,
    },
  },
  apis: [`./routes/*.js`],
};

const swaggerDocs = swaggerJsDoc(options);

require("dotenv").config();

var indexRouter = require("./routes/index");
var studentsRouter = require("./routes/estudiantes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/students", studentsRouter);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
module.exports = app;
