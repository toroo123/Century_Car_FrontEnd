import React, {useEffect, useState} from 'react'
import '../App.css'
import {useAuth} from "../components/AuthProvider";
import { useNavigate } from 'react-router-dom';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {Menu, Dropdown, Divider} from 'antd';
import { TbMenu2 } from "react-icons/tb";
import { GoPlusCircle } from "react-icons/go";

const Header = () => {
  const {isLoggedIn, userName, logout} = useAuth();
  const history = useNavigate();

  const handleMenuClick = (event) => {
    const { key } = event;
    switch (key) {
      case '1':
        history('/guide');
        break;
      case '2':
        history('/about');
        break;
      case '3':
        history('/login');
        break;
      case '4':
        history('/CarForm');
        break;
      case '5':
        history('/');
        break;
      default:
        break;
    }
  };


  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Бидний тухай</Menu.Item>
      <Divider className='m-0'/>
      <Menu.Item key="2">Ашиглах заавар</Menu.Item>
      <Divider className='m-0'/>
      <Menu.Item key="3">Нэвтрэх</Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="6">{userName}</Menu.Item>
      <Divider className='m-0'/>
      <Menu.Item key="4" >Зар нэмэх</Menu.Item>
      <Divider className='m-0'/>
      <Menu.Item key="5" onClick={logout} className='logout'>
        <LogoutOutlined />
        <span className='logoutText'>Гарах</span>
      </Menu.Item>
    </Menu>
  );

  return (

    <>
      <div className='headers'>
        <a href="/">
          <button className='left'>
            CENTURY CAR
          </button>
        </a>
        <div className='right'>
          <div className='list'>
            {!isLoggedIn &&
                <>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                      <TbMenu2 size={30}/>
                    </a>
                  </Dropdown>
                </>
            }
            {isLoggedIn &&
              <>
                <Dropdown overlay={menu2} trigger={['click']}>
                  <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    <TbMenu2 size={30}/>
                  </a>
                </Dropdown>

                {/* <div>{userName}</div> */}
                </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Header