import express from "express";
import authRouter from "./auth.routes.js";

let indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.get('/hehe',(req,res) =>{
    res.json({
        message:'working'
    })
})
export default indexRouter;
