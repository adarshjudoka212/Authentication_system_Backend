const mongoose = require("mongoose")
const mailSender = require( "./../../utilities/mailsender")
//const otpTemplate = require('../mail/emailVerificationTemplate.js')

const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 30, // The document will be automatically deleted after 30 minutes of its creation time
    },
  },
  { timestamps: true },
);

// Define a function to send emails
const OTP = mongoose.model("OTP",OTPSchema);
module.exports = OTP;

async function sendVerificationEmail(email, otp) {
  // Create a transporter to send emails

  // Define the email options

  // Send the email
  try {
    const mailResponse = await mailSender(
      email,
      'OTP for Ducs Connect',
      otpTemplate(otp),
    ) // mail
    console.log('Email sent successfully: ', mailResponse)
  } catch (error) {
    console.log('Error occurred while sending email: ', error)
    throw error
  }
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre('save', async function (next) {
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp)
  }
  next()
})


