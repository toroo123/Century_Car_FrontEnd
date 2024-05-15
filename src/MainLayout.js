import Header from "./main/Header";
import Footer from "./main/Footer";
import setupInterceptors from './interceptor';
import {useEffect} from "react";

setupInterceptors();

const MainLayout = ({ children }) => {
    useEffect(() => {
        console.log("Children ============ " , children);
    }, []);
  return (
    <div className="min-h-screen bg-gray-100 zurag grid content-between">
      {/* Header */}
      <header className="">
        <Header/>
      </header>

      {/* Main Content */}
      <div>
        <div className="mx-auto py-4 sm:px-6 ">
          {/* Render the children components */}
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white ">
        <Footer/>
      </footer>
    </div>
  );
};

export default MainLayout;