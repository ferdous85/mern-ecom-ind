const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const cloudinary = require('cloudinary')

//Register a User
exports.registerUser = catchAsyncError(async (req, res, next)=>{

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

    const {name, email, password} = req.body

    const user = await User.create({
        name, email, password, 
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
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

  //Update user profile
  exports.updateProfile = catchAsyncError(async (req, res, next) => {
   
  const newUserData = {
    name: req.body.name,
    email:req.body.email
  }
  // will add cloudinary later
  const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
    new:true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success:true,
    message:"User profile update successfully"
})
  
  });
  
//Get All User (Admin)
exports.getAllUsers = catchAsyncError(async(req, res, next)=>{
    const users = await User.find()

    res.status(200).json({
      success: true,
      users
    });
})

// Get Single user (Admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});


  //Update user Role - (ADMIN)
  exports.updateUserRole = catchAsyncError(async (req, res, next) => {
   
    const newUserData = {
      name: req.body.name,
      email:req.body.email,
      role: req.body.role
    }
    
    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
      new:true,
      runValidators: true,
      useFindAndModify: false
    })
  
    res.status(200).json({
      success:true,
      message:"User Role Updated successfully"
  })
    
    });

  //Delete User -- (Admin)
  exports.deleteUser = catchAsyncError(async (req, res, next) => {   
    const user = await User.findById(req.params.id)
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }

    await user.remove()
  
    res.status(200).json({
      success:true,
      message:"User Deleted successfully"
  })
    
    });



