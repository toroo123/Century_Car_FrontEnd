import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {EyeInvisibleTwoTone, EyeTwoTone} from '@ant-design/icons';
import {useAuth} from "../components/AuthProvider";
import './pages.css';
import {Form, Input, Button} from "antd";

function LoginPage() {
  const [error, setError] = useState('');
  const history = useNavigate();
  const {login} = useAuth();

  const onFinish = async (values) => {
    const {email, password} = values;
    try {
      login(email, password);
      history("/");
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="loginBox">
      <div className="login">
        <p className="text-sky-500 font-extrabold text-2xl">Нэвтрэх</p>
        <p className="text-white py-4">Хэрэглэгчийн нэр, нууц үгээ оруулна уу.</p>
        <Form
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{required: true, type: 'email', message: 'Имэйлээ оруулна уу!'}]}
          >
            <div className="text-sky-500 py-2">
              <p>Имэйл</p>
              <Input
                type="email"
                placeholder="Имэйлээ оруулна уу"
                className="inputSel max-w-s placeholder-gray-400"
              />
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{required: true, message: 'Нууц үгээ оруулна уу!',}]}
          >
            <div className="text-sky-500">
              <p>Нууц үг</p>
              <Input.Password
                placeholder="Нууц үгээ оруулна уу"
                iconRender={(visible) => (visible ? <EyeTwoTone twoToneColor="#BDBDBD"/> :
                  <EyeInvisibleTwoTone twoToneColor="#BDBDBD"/>)}
                className="inputSel max-w-s"
              />
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Нэвтрэх
            </Button>
          </Form.Item>
        </Form>
        <div className="text-white pt-3 flex justify-center">
          <p>Энд дарж бүртгүүлнэ үү </p>
          <a className="underline underline-offset-4 text-sky-600 ms-2" href="/signup">
            Бүртгүүлэх
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
