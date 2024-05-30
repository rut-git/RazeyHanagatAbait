const jwt = require("jsonwebtoken")

const functionToken = (req, res) => {
   
    const token = req.params.token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                 return res.json({ans:false})
            }
            
        }
    )
    return res.json({ans:true})
}


module.exports = functionToken