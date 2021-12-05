const express =  require("express")
const router = express.Router()
const userSchema = require("../model/userSchema")
const {passwordMatch, registerController,loginController, usersController} = require("../controllers/controller")


router.post("/register",passwordMatch,registerController)

router.post("/login",loginController)

router.get("/users", usersController)


module.exports =  router