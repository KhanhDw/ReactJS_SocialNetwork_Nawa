import Header from '../components/Header';
import { type ReactNode } from 'react'; 

// Định nghĩa interface cho props
interface HeaderOnlyProps {
  children: ReactNode;
}

function HeaderOnly({children}:HeaderOnlyProps) {
  return (
   <div className="flex flex-col">
      <Header />
      <div className="flex-grow border-2 border-gray-100">
        {children}
      </div>
    </div>
  );
}

export default HeaderOnly;