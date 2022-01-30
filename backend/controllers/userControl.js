const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const user = await Users.findOne({ email })
            if (user) {
                res.status(400).json({ status: 400, msg: "The email already exists. " }).end();
                return;
            }

            if (password.length < 6) {
                {
                    res.status(400).json({ status: 400, msg: "Password atleast 6 characters" }).end();
                    return;
                }
            }

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })

            // // Save mongodb
            await newUser.save()

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: 6000,
            });

            res.cookie('refreshtoken', token, {
                httpOnly: true,
                secure: false,
                path: '/',
                maxAge: 60 * 60 * 1000
            })

            res.json({ token });

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login:
        async (req, res) => {
            try {
                const { email, password } = req.body;
                const user = await Users.findOne({ email })
                if (!user) {
                    res.status(400).json({ status: 400, msg: "User doesn't exist." }).end();
                    return;
                }

                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    res.status(400).json({ status: 400, msg: "Incorrect password." }).end();
                    return;
                }

                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: 60000,
                });

                res.cookie('refreshtoken', token, {
                    httpOnly: true,
                    path: '/',
                    secure: false,
                    domain: "localhost",
                    maxAge: 60 * 60 * 1000
                })
                res.json({ token });

            } catch (err) {
                return res.status(500).json({ msg: err.message })
            }
        },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/' })
            return res.json({ msg: "Logged out" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" })
            jwt.verify(rf_token, process.env.JWT_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please Login or Register" })

                const accesstoken = createAccessToken({ id: user.id })

                res.json({ accesstoken })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addCart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                cart: req.body.cart
            })

            return res.json({ msg: "Added to cart" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}


const createAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '11m' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '11m' })
}

module.exports = userCtrl

