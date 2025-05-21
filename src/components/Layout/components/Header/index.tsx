import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex justify-center space-x-4">
                <Link
                    to="/"
                    className="hover:text-blue-300"
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className="hover:text-blue-300"
                >
                    About
                </Link>
                <Link
                    to="/login"
                    className="hover:text-blue-300"
                >
                    Login
                </Link>
            </nav>
        </header>
    );
}

export default Header;
