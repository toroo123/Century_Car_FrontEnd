import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Button, Input} from "antd";
import {Form} from "antd";
import './pages.css'

function SignupPage() {
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSignup = async ({fullName, email, password, confirmPassword, mobile}) => {
    try {
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
        role: "USER",
        mobile
      });

      console.log(response.data);
      history('/');
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="loginBox">
      <div className="login">
        <p className="text-sky-500 font-extrabold text-2xl pb-4">Бүртгүүлэх</p>
        {error && <p className="text-red-500">{error}</p>}
        <Form onFinish={handleSignup}>
          <Form.Item
            name="fullName"
            rules={[{required: true, message: 'Нэвтрэх нэрээ оруулна уу!'}]}
          >
            <div className="text-sky-500">
              <p>Нэвтрэх нэр</p>
              <Input placeholder="Нэвтрэх нэр" className="inputSel max-w-s placeholder-gray-400"/>
            </div>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{required: true, type: 'email', message: 'Имэйлээ оруулна уу!'}]}
          >
            <div className="text-sky-500">
              <p>Имэйл</p>
              <Input placeholder="Имэйл хаяг" className="inputSel max-w-s placeholder-gray-400"/>
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{required: true, message: 'Нууц үгээ оруулна уу!'}]}
          >
            <div className="text-sky-500">
              <p>Нууц үг</p>
              <Input.Password placeholder="Нууц үг" className="inputSel max-w-s placeholder-gray-400"/>
            </div>
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              {required: true, message: 'Нууц үгээ баталгаажуулна уу!'},
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Таны оруулсан хоёр нууц үг таарахгүй байна!'));
                },
              }),
            ]}
          >
            <div className="text-sky-500">
              <p>Нууц үгээ давтах</p>
              <Input.Password placeholder="Нууц үгээ баталгаажуулах" className="inputSel max-w-s placeholder-gray-400"/>
            </div>
          </Form.Item>
          <Form.Item
            name="mobile"
            rules={[{required: true, message: 'Утасны дугаараа оруулна уу!'}]}
          >
            <div className="text-sky-500">
              <p>Утасны дугаар</p>
              <Input placeholder="Утасны дугаар" className="inputSel max-w-s placeholder-gray-400"/>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Бүртгүүлэх
            </Button>
          </Form.Item>
          <div className="text-white pt-3 flex justify-center">
            <p>Аль хэдийн бүртгүүлсэн? </p>
            <a className="underline underline-offset-4 text-sky-600 ms-2" href="/login">
              Нэвтрэх
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignupPage;
