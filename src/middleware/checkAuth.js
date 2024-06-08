const { modelName } = require("../model/notionModel")

const isLogin = async (req, res, next ) => {
    if(req.user) {
        next()
    }else{
        return res.status(401).send({message: "Access denied"})
    }
}

module.exports = isLogin;