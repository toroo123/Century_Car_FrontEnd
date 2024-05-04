import Header from "./main/Header";
import Footer from "./main/Footer";
import setupInterceptors from './interceptor';

setupInterceptors();

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 zurag">
      {/* Header */}
      <header className="">
       <Header/>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Render the children components */}
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow">
        <Footer/>
      </footer>
    </div>
  );
};

export default MainLayout;