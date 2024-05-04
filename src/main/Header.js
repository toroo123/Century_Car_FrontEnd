import React from 'react'
import '../App.css'

const Header = () => {

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
            <div>
              <a href="/login">
                <button>
                  Нэвтрэх
                </button>
              </a>
            </div>
            <div>
              <a href="/favorite">
                <button>
                  Хадгалсан машин
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header