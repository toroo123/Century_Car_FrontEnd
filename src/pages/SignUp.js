import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Button} from "@nextui-org/react"; // Import useHistory hook

function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobileNumber] = useState('');
  const [error, setError] = useState(''); // State to manage error messages
  const history = useNavigate(); // Get the history object for redirection

  const handleSignup = async () => {
    try {
      // Check for empty fields
      if (!fullName || !email || !password || !confirmPassword || !mobile) {
        setError('Please fill in all fields.');
        return;
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await axios.post('http://localhost:8081/auth/signup', {
        fullName,
        email,
        password,
        role:"USER",
        mobile
      });
      // Handle successful signup
      console.log(response.data);
      history('/');
    } catch (error) {
      // Handle signup error
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="grid w-2/3 gap-4">
        <p className="mb-4 text-red-500 text-center text-xl">Бүртгүүлэх</p>
        {error && <p className="text-red-500">{error}</p>}
        <input className="mb-3 p-2 rounded border border-gray-300 w-96" id="fullName" placeholder="Full Name"
               value={fullName} type="text" onChange={(e) => setFullName(e.target.value)}/>
        <input className="mb-3 p-2 rounded border border-gray-300 w-96" placeholder="Email Address" id="email"
               value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
        <input className="mb-3 p-2 rounded border border-gray-300 w-96" placeholder="Password" id="password"
               type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input className="mb-3 p-2 rounded border border-gray-300 w-96" placeholder="Confirm Password"
               id="confirmPassword" type="password" value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}/>

        <input className="mb-2 p-2 rounded border border-gray-300 w-96" placeholder="Mobile Number" id="mobileNumber"
               value={mobile} type="text" onChange={(e) => setMobileNumber(e.target.value)}/>

        <Button color="primary" onClick={handleSignup}>
          Бүртгүүлэх
        </Button>

        <div className="text-center">
          <p>Already Register? <a href="/public">Login</a></p>
        </div>
      </div>
    </div>


  );
}

export default SignupPage; 
