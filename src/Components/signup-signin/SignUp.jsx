import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (fullName.trim() === '') {
      setError('Full name cannot be empty');
      return;
    }

    if (email.trim() === '') {
      setError('Email cannot be empty');
      return;
    }

    if (password.trim() === '') {
      setError('Password cannot be empty');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Password strength check
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Simulate successful signup
    localStorage.setItem('userEmail', email);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image Background */}
      <div className="w-1/2 relative overflow-hidden">
        <img 
          src="/api/placeholder/800/600" 
          alt="Signup background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-8">
            <h1 className="text-5xl font-extrabold text-white mb-4">
              Join Our Community
            </h1>
            <p className="text-white text-opacity-80 text-lg">
              Create an account and unlock exclusive features and personalized experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-1/2 flex items-center justify-center p-16 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600 mb-8">Sign up to get started</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-6 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                id="fullName"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-0 py-2 bg-transparent text-gray-800 border-b border-gray-300 focus:border-purple-600 focus:outline-none transition duration-300 placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-0 py-2 bg-transparent text-gray-800 border-b border-gray-300 focus:border-purple-600 focus:outline-none transition duration-300 placeholder-gray-400"
              />
            </div>
            
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-0 py-2 bg-transparent text-gray-800 border-b border-gray-300 focus:border-purple-600 focus:outline-none transition duration-300 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600 hover:text-purple-600 transition"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-0 py-2 bg-transparent text-gray-800 border-b border-gray-300 focus:border-purple-600 focus:outline-none transition duration-300 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600 hover:text-purple-600 transition"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            
            <div className="flex items-center space-x-2 my-4">
              <input
                type="checkbox"
                id="terms"
                required
                className="rounded text-purple-600 focus:ring-purple-400"
              />
              <label 
                htmlFor="terms" 
                className="text-gray-600 text-sm"
              >
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 mt-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <User className="w-5 h-5" />
              <span>Create Account</span>
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-500 rounded-full">
                  Or
                </span>
              </div>
            </div>

            <button 
              type="button"
              className="w-full py-3 bg-white text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-50 transition flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.75c-.99.67-2.26 1.07-3.71 1.07-2.87 0-5.3-1.93-6.17-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.83 14.08c-.25-.67-.38-1.39-.38-2.13s.14-1.46.38-2.13V7.98H2.18C1.43 9.68 1 11.68 1 13.95s.43 4.27 1.18 6.02l3.65-2.89z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.02l3.65 2.89c.87-2.6 3.3-4.53 6.17-4.53z"/>
              </svg>
              Sign up with Google
            </button>
          </form>

          <div className="text-center text-sm mt-4">
            Already have an account? 
            <a 
              href="/signin" 
              className="ml-2 text-purple-600 hover:underline"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;