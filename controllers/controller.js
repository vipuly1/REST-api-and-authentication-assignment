const userSchema = require("../model/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const passwordMatch = (req, res, next) => {
    console.log(req.body)
    let { password, confirmPass } = req.body
    if (password === confirmPass) {
        next()
    }
    else {
        res.status(406).json("Passwords do not match")
    }
}

const registerController = (req, res) => {
    const user = new userSchema(req.body)
    const hashedPassword = bcrypt.hashSync(user.password, 10)
    user.password = hashedPassword
    user.confirmPass = hashedPassword
    user.save((err, user) => {
        if (err) {
            res.json(user)
        }
        else {
            res.json(user)
        }

    })

}

const loginController = (req, res) => {
    userSchema.find({ email: req.body.email, password: req.body.password }, (err, user) => {
        if (err) res.status(401).json(err)
        else {
            const { name, email, password, isAdmin } = user[0]
            var token = jwt.sign({ name: name, email: email, password: password, isAdmin: isAdmin }, "abcxyz")
            res.json(token)
            return


        }
    })

}

const usersController = (req, res) => {
    var token = req.headers.authorization
    if (token == undefined) {
        res.json("Login is required")
    }
    else {
        try {
            var decoded = jwt.verify(token, "abcxyz")
            if (decoded.isAdmin == true) {
                
                userSchema.find({}, (err, users) => {
                    if (err) {
                        console.log("if err")
                        res.json(err)
                    }
                    else {
                        res.json(users)
                    }
                })
            }
        }
        catch (err) {
            res.json(err)

        }
    }

    res.json("text")
}

module.exports = {
    passwordMatch,
    registerController,
    loginController,
    usersController
}