require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
}))
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,
}))



// Routes

app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))

// Connect to mongodb

const URI = process.env.MONGODB_URL

mongoose.set("strictQuery", false);

mongoose.connect(URI, {}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(('Server is running on port: ' + PORT))
})
