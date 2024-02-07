const express = require("express");
const router = express.Router();
const userRoutes = require("./../domains/user");
const OTPRoutes = require("./../domains/OTP");
const EmailVerificationRoutes = require("./../domains/email_verification")
const ForgotpasswordRotes = require("./../domains/forgot_password")

router.use("/user", userRoutes);
router.use("/OTP",OTPRoutes);
router.use("/email_verification",EmailVerificationRoutes);
router.use("/forgot_password",ForgotpasswordRotes);

module.exports = router;
 
