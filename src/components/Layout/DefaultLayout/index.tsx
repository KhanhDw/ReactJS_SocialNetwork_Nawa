import Header from '../components/Header';
import Footer from '../components/Footer';
import { type ReactNode } from 'react'; 

// Định nghĩa interface cho props
interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({children}:DefaultLayoutProps) {
  return (
   <div className="flex flex-col justify-between w-screen h-screen">
      <Header />
      <div className="flex-grow overflow-y-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;