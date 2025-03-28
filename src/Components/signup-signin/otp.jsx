import  { useState, useRef, useEffect } from "react";
import { Shield, RefreshCw } from 'lucide-react';

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus the first input on component mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus to next input field after entering a digit
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content contains only digits
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("").slice(0, 4);
      const newOtp = [...otp];

      digits.forEach((digit, index) => {
        if (index < 4) {
          newOtp[index] = digit;
        }
      });

      setOtp(newOtp);

      // Focus the appropriate input based on how many digits were pasted
      if (digits.length < 4 && inputRefs.current[digits.length]) {
        inputRefs.current[digits.length].focus();
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center  bg-gradient-to-br from-[#0f172a] via-[#3b0764] to-[#240046] p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white bg-opacity-5 backdrop-blur-2xl border border-white border-opacity-10 rounded-3xl shadow-2xl overflow-hidden relative">
          {/* Gradient Border Effect */}
          <div className="absolute inset-[-1px] bg-gradient-to-br from-white/10 to-white/5 rounded-3xl -z-10 blur-sm"></div>
          
          {/* Inner Glowing Border */}
          <div className="absolute inset-1 border-2 border-white border-opacity-5 rounded-[1.5rem] pointer-events-none"></div>

          <div className="p-8 relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-12 h-12 text-white text-opacity-80 mr-3" />
              <h2 className="text-3xl font-bold text-white text-opacity-90">Verify Email</h2>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-white text-opacity-70 mb-2">
                We've sent a verification code to
              </p>
              <p className="text-purple-400 font-medium">your@email.com</p>
            </div>

            <div className="mb-6">
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-14 h-14 text-center text-white text-xl font-bold bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition duration-300"
                  />
                ))}
              </div>
              <p className="text-xs text-white text-opacity-60 text-center mt-2">
                Enter the 4-digit code sent to your email
              </p>
            </div>

            <button
              type="button"
              className="w-full py-3 bg-purple-700 bg-opacity-70 hover:bg-opacity-90 text-white rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Shield className="w-5 h-5" />
              <span>Verify Code</span>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white border-opacity-20"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-purple-900 bg-opacity-70 backdrop-blur-sm px-3 text-white text-opacity-70 rounded-full">
                  Need help?
                </span>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="text-white text-opacity-70 hover:text-opacity-100 flex items-center space-x-2 transition"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Resend Code</span>
              </button>
            </div>

            <div className="mt-6 text-center text-white text-opacity-70 text-sm">
              Didn't receive the code? 
              <button 
                className="ml-2 text-white hover:underline font-semibold"
              >
                Contact Support
              </button>
            </div>

            <p className="text-white text-opacity-70 text-sm text-center mt-6">
              <a 
                href="/signup" 
                className="text-purple-400 hover:text-purple-300 flex items-center justify-center"
              >
                ← Back to Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;