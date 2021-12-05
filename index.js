const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 8080
const usersRoutes = require("./views/routes")

// const http = require("http")
// console.log(http.STATUS_CODES)

app.use(express.json())

app.use(usersRoutes)


mongoose.connect("mongodb+srv://vipuly1:vipul123@cluster0.nftit.mongodb.net/authentication?retryWrites=true&w=majority")
.then(()=>{
    console.log("DB Connected")
})
.catch((err)=>{
    console.log(err)
})

app.listen(port, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Server has started")
    }
})