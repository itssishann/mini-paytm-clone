const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET;
const { User } = require("../models/user");
const {Account} = require("../models/account") 
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
const router = express.Router();
const saltRounds = 10;

const signupSchema = zod.object({
    userName: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post("/signup", async (req, res) => {
    const { success, error, data: body } = signupSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ msg: "Incorrect Inputs" });
    }

    const { userName, firstName, lastName, password: plainPassword } = body;

    try {
        const existingUser = await User.findOne({ userName: body.userName });

        if (existingUser) {
            return res.status(400).json({ msg: "User Already Exists" });
        }

        const hashPass = await bcrypt.hash(plainPassword, saltRounds);

        const dbUser = await User.create({
            userName,
            firstName,
            lastName,
            password: hashPass // store the hashed password
        });

        // Generate a random balance between 100 and 10,000
        const randomBalance = Math.floor(Math.random() * 10000);

        // Create an account for the user with the random balance
        const account = await Account.create({
            userId: dbUser._id,
            balance: randomBalance
        });

        const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);
       
        return res.json({
            msg: "User created successfully!",
            userName:firstName,
            token: token
        });

    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", error: err.message });
    }
});

const signinBody = zod.object({
    userName: zod.string(),
    password: zod.string()
});
// router.get("/me", (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

//     if (!token) {
//         return res.status(401).json({
//             msg: "User Not Logged In"
//         });
//     }

//     console.log(token);
//     res.status(200).json({
//         msg: "Token received",
//         token
//     });
// });
router.post("/signin", async (req, res) => {
    const { success, error, data } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: "Invalid Inputs" });
    }

    const { userName, password } = data;
    try {
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        return res.json({ token,userName:user.firstName });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: "Invalid Inputs" });
    }

    try {
        await User.updateOne({ _id: req.userId }, req.body);

        return res.json({ message: "Updated successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        });

        return res.json({
            users: users.map(user => ({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

module.exports = router;

