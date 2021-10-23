const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')


// Handling uncaught exception
process.on('uncaughtException', (err)=>{
    console.log(`Error:${err.message}`)
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1)
})


// Config
dotenv.config({path:"backend/config/config.env"})

//connecting database
connectDatabase()

// cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const PORT = process.env.PORT
const server = app.listen(PORT, ()=>{
    console.log(`Server is working on ${PORT}`);
})


// Unhandled Promise Rejection

process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to unhandled Promise Rejection`)
    server.close(()=>{
        process.exit(1)
    })

})