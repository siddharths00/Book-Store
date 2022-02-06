const Users = require('../models/userModel')
const jwt = require('jsonwebtoken')

const authAdmin = async (req, res, next) =>{
    try {
        console.log("Authentication Admin ", req.header("Authorization"));
        
        

        const token = req.header("Authorization")
        let newUser;
        if(!token){
            res.status(400).json({msg: "Invalid Authentication"})
            return;
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
            if(err){
                res.status(400).json({msg: "Invalid Authentication"})
                return;
            }

            newUser = user;
        })

        console.log(newUser);
        const user = await Users.findOne({
            _id: newUser.id
        })
        if(user.role === 0)
        {
            res.status(400).json({msg: "Admin resources access denied"})
            return 
        }
            

        next()
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin