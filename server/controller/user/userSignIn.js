const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken');

async function userSignInController(req, res, next) {
    try {
        const { email, password } = req.body

        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            throw new Error("User not found")
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            }
            const expiresIn = process.env.TOKEN_EXPIRY || 60 * 60 * 24 * 30; // Default to 30 days in seconds
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn });

            const tokenOption = {
                httpOnly: true,
                secure: true, // Only secure in production
                sameSite: 'Lax', // Set SameSite attribute to Lax
            }

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: { token, expiresIn },
                success: true,
                error: false
            })

        } else {
            throw new Error("Invalid password")
        }
    } catch (err) {
        next(err); // Pass the error to the next middleware
    }
}

module.exports = userSignInController
