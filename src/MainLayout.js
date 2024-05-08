import Header from "./main/Header";
import Footer from "./main/Footer";
import setupInterceptors from './interceptor';

setupInterceptors();

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 zurag grid content-between">
      {/* Header */}
      <header className="">
        <Header/>
      </header>

      {/* Main Content */}
      <div>
        <div className="max-w-xl mx-auto py-4 sm:px-6 lg:px-4 ">
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