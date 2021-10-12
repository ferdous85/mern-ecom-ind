const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')

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
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    sendToken(user, 200, res);
  });

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

  //Forgot Password
  exports.forgotPassword = catchAsyncError( async(req, res, next)=>{
      const user = await User.findOne({email: req.body.email})

      if(!user){
          return next(new ErrorHandler('User not found', 404))
                }
        // Get ResetPassword Token
      const resetToken =  user.getResetPasswordToken()

      await user.save({validateBeforeSave: false})

      const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

      const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email, please ignore it`

      try {
            await sendEmail({
                email: user.email,
                subject: "Password Recovery Email",
                message
            })  

            res.status(200).json({
                success:true,
                message:`Email send to ${user.email} successfully`
            })

      } catch (error) {
          user.resetPasswordToken = undefined
          user.resetPasswordExpire = undefined

          await user.save({validateBeforeSave:false})
          return next(new ErrorHandler(error.message, 500))
      }
  })

  //Get user Detail
  exports.getUserDetails = catchAsyncError(async(req, res, next)=>{
      const user = await User.findById(req.user.id)

      res.status(200).json({
        success: true,
        user
      });
  })

  //Update user password
  exports.forgotPassword = catchAsyncError( async(req, res, next)=>{
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new ErrorHandler('User not found', 404))
              }
      // Get ResetPassword Token
    const resetToken =  user.getResetPasswordToken()

    await user.save({validateBeforeSave: false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email, please ignore it`

    try {
          await sendEmail({
              email: user.email,
              subject: "Password Recovery Email",
              message
          })  

          res.status(200).json({
              success:true,
              message:`Email send to ${user.email} successfully`
          })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message, 500))
    }
})

//Get user Detail
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
  });