const otpGenerator = require('otp-generator');
const OTP = require('../models/otpModel');
const {userModel} = require('../models/userSchema');

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user is already present
    const checkUserPresent = await userModel.findOne({ email });
    // If userModel found with provided email
    if (checkUserPresent) {
      return res.status(401).json({
        error: false,
        message: 'User is already registered',
      });
    }
    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(4, { 
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      error: true,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: false, error: error.message });
  }
};