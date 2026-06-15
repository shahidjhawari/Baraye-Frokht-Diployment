const jwt = require('jsonwebtoken')

const SECRET_KEY = "baraye-frokht-secret-key-2024"  // ✅ hardcode kar diya

async function authToken(req,res,next){
    try{
        const token = req.cookies?.token

        console.log("token",token)
        if(!token){
            return res.status(200).json({
                message : "Please Login...!",
                error : true,
                success : false
            })
        }

        jwt.verify(token, SECRET_KEY, function(err, decoded) {  // ✅ SECRET_KEY use kiya
            console.log(err)
            console.log("decoded",decoded)
            
            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?._id

            next()
        });

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
}

module.exports = authToken