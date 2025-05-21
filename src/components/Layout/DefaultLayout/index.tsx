import Header from '../components/Header';
import Footer from '../components/Footer';
import { type ReactNode } from 'react'; 

// Định nghĩa interface cho props
interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({children}:DefaultLayoutProps) {
  return (
   <div className="flex flex-col">
      <Header />
      <div className="flex-grow border-2 border-gray-100">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;