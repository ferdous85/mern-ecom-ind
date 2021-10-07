const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')


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