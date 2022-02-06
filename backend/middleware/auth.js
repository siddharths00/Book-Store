const jwt = require('jsonwebtoken')

const auth = (req, res, next) =>{
    try {
        console.log("Authentication");
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Authentication Failure"})

        jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
            if(err) return res.status(400).json({msg: "Login First"})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth