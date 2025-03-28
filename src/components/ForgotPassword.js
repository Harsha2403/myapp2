import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/api/send-otp", { phone });
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP", error);
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post("http://localhost:5000/api/verify-otp", { phone, otp });
      setStep(3);
    } catch (error) {
      console.error("Invalid OTP", error);
    }
  };

  const resetPassword = async () => {
    try {
      await axios.post("http://localhost:5000/api/reset-password", { phone, newPassword });
      alert("Password reset successful!");
    } catch (error) {
      console.error("Error resetting password", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h5">Forgot Password</Typography>
      {step === 1 && (
        <>
          <TextField label="Phone Number" fullWidth onChange={(e) => setPhone(e.target.value)} />
          <Button onClick={sendOtp} variant="contained" color="primary">
            Send OTP
          </Button>
        </>
      )}
      {step === 2 && (
        <>
          <TextField label="Enter OTP" fullWidth onChange={(e) => setOtp(e.target.value)} />
          <Button onClick={verifyOtp} variant="contained" color="primary">
            Verify OTP
          </Button>
        </>
      )}
      {step === 3 && (
        <>
          <TextField label="New Password" type="password" fullWidth onChange={(e) => setNewPassword(e.target.value)} />
          <Button onClick={resetPassword} variant="contained" color="primary">
            Reset Password
          </Button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
