// import {Router} from "express"
// import {
//          changeCuurentpassword,
//          getCurrentUser, 
//          getUserChannelProfile, 
//          getWatchHistory, 
//          loginUser, 
//          logoutUser, 
//          refreshAccessToken, 
//          registerUser, 
//          updateAccountDetials,
//          updateUserAvatar, 
//          updateUsercoverImage
//               } from "../../controller/user.controller.js"

// import { upload } from "../../middlewares/multer.middleware.js";

// import { verifyJWT } from "../../middlewares/auth.middleware.js";

// const userRouter=Router();

// userRouter.route("/register").post(
//                                upload.fields([ {
//                                                     name: "avatar",
//                                                     maxCount: 1
//                                                 }, 
//                                                 {
//                                                     name: "coverImage",
//                                                     maxCount: 1
//                                                 }]),
//                                                 registerUser)

// userRouter.route("/login").post(loginUser)

// //secured route

// userRouter.route("/logout").post(verifyJWT,logoutUser)    

// userRouter.route("/refresh-token").post(refreshAccessToken)

// userRouter.route("/change-password").post(verifyJWT,changeCuurentpassword)

// userRouter.route("/current-user").get(verifyJWT,getCurrentUser)

// userRouter.route("/update-account").patch(verifyJWT,updateAccountDetials)

// userRouter.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)

// userRouter.route("/cover-image").patch(verifyJWT,upload.single("coverImage"),updateUsercoverImage)

// userRouter.route("/c/:username").get(verifyJWT,getUserChannelProfile)

// userRouter.route("/history").get(verifyJWT,getWatchHistory)







// export default userRouter