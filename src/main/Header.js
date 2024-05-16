import React, {useEffect, useState} from 'react'
import '../App.css'
import {useAuth} from "../components/AuthProvider";
import {LogoutOutlined} from '@ant-design/icons';
const Header = () => {
  const {isLoggedIn, userName, logout} = useAuth();
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
                  <a href="/about">
                    <button className='left'>
                      Бидний тухай
                    </button>
                  </a>
                  <div>
                    <a href="/guide">
                      <button className='left'>
                        Ашиглах заавар
                      </button>
                    </a>
                  </div>
                </>
            }
            {isLoggedIn &&
              <div>
                <a href="/CarForm">
                  <button>
                    Зар нэмэх
                  </button>
                </a>
              </div>
            }
            {
              isLoggedIn ?
                <div>{userName}</div> :
                <div>
                  <a href="/login">
                    <button>
                      Нэвтрэх
                    </button>
                  </a>
                </div>
            }
            {isLoggedIn && <div>
              <button onClick={logout} className='logout'>
                <LogoutOutlined />
                <span className='logoutText'>Гарах</span>
              </button>
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header