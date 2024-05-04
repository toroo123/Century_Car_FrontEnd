import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Button, Input} from "@nextui-org/react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {useAuth} from "../components/AuthProvider";


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { login } = useAuth();
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError('Please enter both username and password.');
        return;
      }
      login(email, password)
      history("/")
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Invalid username or password.');
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/3">
          <div className="mb-4">
            <Input type="email" label="Email" variant="bordered" placeholder="Enter your email" value={email}
                   onChange={(e) => setEmail(e.target.value)} className="max-w-xs"/>
          </div>
          <div className="mb-6">
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              className="max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <FaEyeSlash/>
                  ) : (
                    <FaEye/>
                  )}
                </button>
              }
            />

          </div>
            <Button color="primary" onClick={handleLogin}>Нэвтрэх</Button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/signup">
            Бүртгүүлэх
          </a>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
