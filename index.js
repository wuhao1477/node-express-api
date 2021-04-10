const api = require("./api")
const express = require("express")
const app = express()


app.listen(80)
app.get("/",async(req,res)=>{
    let order_number = req.query.order_number
    let data = await api.main(order_number)
    res.json(data)
})