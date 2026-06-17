const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || "baraye-frokht-secret-key-2024"

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body

        if (!email) throw new Error("Please provide email")
        if (!password) throw new Error("Please provide password")

        const user = await userModel.findOne({ email })
        if (!user) throw new Error("User not found")

        const checkPassword = await bcrypt.compare(password, user.password)

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            }

            const token = jwt.sign(tokenData, SECRET_KEY, { 
                expiresIn: 60 * 60 * 24 * 30 
            });

            const isProduction = process.env.NODE_ENV === "production"

            const tokenOption = {
                httpOnly: true,
                secure: isProduction,           // ✅ Production pe true (HTTPS)
                sameSite: isProduction ? "None" : "Lax",  // ✅ Cross-domain ke liye None
                maxAge: 30 * 24 * 60 * 60 * 1000  // ✅ 30 din milliseconds mein
            }

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            })

        } else {
            throw new Error("Please check Password")
        }

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignInController