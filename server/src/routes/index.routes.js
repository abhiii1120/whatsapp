import express from "express";

let indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "yayaya",
  });
});

export default indexRouter;
