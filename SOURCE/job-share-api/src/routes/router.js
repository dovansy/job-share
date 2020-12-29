const express = require("express");

const routes = require("./index.routers");
const userRouter = require("./users.routers");
const educationRouter = require("./education.routers");
const experienceRouter = require("./experience.routers");
const skillRouter = require("./skill.routers");
const positionRouter = require("./position.routers");
const projectRouter = require("./project.routers");
const volunteerRouter = require("./volunteer.routers");
const companyRouter = require("./company.routers");
const reviewRouter = require("./review.routers");
const jobRouter = require("./job.routers");
const overViewRouter = require("./overview.routers");

const apiRoute = express();

apiRoute.use("/", routes);
apiRoute.use("/users", userRouter);
apiRoute.use("/education", educationRouter);
apiRoute.use("/experience", experienceRouter);
apiRoute.use("/skill", skillRouter);
apiRoute.use("/position", positionRouter);
apiRoute.use("/project", projectRouter);
apiRoute.use("/volunteer", volunteerRouter);
apiRoute.use("/company", companyRouter);
apiRoute.use("/review", reviewRouter);
apiRoute.use("/job", jobRouter);
apiRoute.use("/overview", overViewRouter);

module.exports = apiRoute;
