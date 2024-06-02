const express = require("express");
const router = express.Router();
const userRouter = require("./user")
const accountRouter = require("./account")
require('dotenv').config();

module.exports = router;
router.use("/user",userRouter)
router.use("/account",accountRouter)
router.get("/", (req, res) => {
    res.json({
        status:"Running"
    });
});

