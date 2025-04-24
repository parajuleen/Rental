require('dotenv').config()
const express=require('express')
const app=express()
const cookie_parser=require("cookie-parser")
const cors=require('cors')
const{handleWebhook}=require('./webhooks/webhook.stripe')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
app.use(cookie_parser())
app.use(express.urlencoded({
    extended: true
}))

app.post('/webhook',express.raw({type:"application/json"}),handleWebhook)


app.use(express.json())

const userRouter=require('./routes/user.routes')
const itemRouter=require('../src/routes/item.route')
const bookRouter=require('../src/routes/booking.route')
const paymentRouter=require('../src/routes/payment.route')

app.use('/api/users',userRouter)
app.use('/api/items',itemRouter)
app.use('/api/booking',bookRouter)
app.use('/api/payment',paymentRouter)


module.exports=app