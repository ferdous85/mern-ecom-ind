const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')

//Register a User
exports.registerUser = catchAsyncError(async (req, res, next)=>{
    const {name, email, password} = req.body

    const user = await User.create({
        name, email, password, 
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicurl"
        }
    })

    sendToken(user, 201, res)
})

//Login User
exports.loginUser = catchAsyncError(async (req, res, next)=>{
    const {email, password} = req.body
    if(!email || !password) {
        return next(new ErrorHandler("Please enter Email & Password", 400))
            }

    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401))
          }
        
    const isPasswordMatch = user.comparePassword(password)
    if(!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401)) 
    }
    
    sendToken(user, 200, res)
})

//Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });
