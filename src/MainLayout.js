import Header from "./main/Header";
import Footer from "./main/Footer";
import setupInterceptors from './interceptor';
import {useEffect} from "react";
import { Divider } from 'antd';

setupInterceptors();

const MainLayout = ({ children }) => {
    useEffect(() => {
        console.log("Children " , children);
    }, []);
  return (
    <div className="zurag">
      <div className="zuragBox min-h-screen grid content-between">
        {/* Header */}
        <div className="">
          <Header/>
          {/* <Divider style={{ borderWidth: 1, borderColor: 'white', margin: 0}} />  */}
        </div>
      
        {/* Main Content */}
        <div>
          <div className="mx-auto  sm:px-2 ">
            {/* Render the children components */}
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="text-white flex items-end justify-center">
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;