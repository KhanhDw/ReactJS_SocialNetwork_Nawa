import { useState } from "react";
import { Link } from "react-router-dom"; // Use react-router-dom for routing (optional)
import { ChevronRight } from "lucide-react"; // Icons

// Replace with your UI library or custom Tailwind-styled components
import { Button } from "@/components/ui/button"; // e.g., shadcn/ui or custom
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // For error handling
    const [showPassword, setShowPassword] = useState(false); // For toggling password visibility

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(""); // Reset error state
        try {
            // Replace with your authentication logic (e.g., Firebase, Auth0, or API call)
            console.log("Login with:", { email, password });
            // Example: API call with fetch
            /*
      const response = await fetch("YOUR_API_ENDPOINT/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Login failed");
      const data = await response.json();
      // Handle successful login (e.g., store token, redirect)
      */
        } catch (err) {
            console.error("Login error:", err); // Log error for debugging
        }
    };

    const handleGoogleLogin = () => {
        // Replace with your Google login logic (e.g., Firebase Google Auth)
        console.log("Login with Google");
        // Example with Firebase:
        /*
    import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google user:", result.user);
      })
      .catch((error) => {
        setError("Google login failed");
      });
    */
    };

    const handleShowAndHidePassword = () => {
        console.log("Toggle password visibility");

        setShowPassword((prev) => !prev); // Toggle password visibility
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:block bg-black">
                <div className="relative h-full w-full">
                    <img
                        src="/bannerLogin.png"
                        alt="Background"
                        className="h-full w-full object-cover opacity-80 max-h-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    <div className="absolute bottom-12 left-12 text-white">
                        <h2 className="text-3xl font-light tracking-wide">
                            WELCOME TO
                        </h2>
                        <h1 className="mt-2 text-5xl font-bold tracking-tight">
                            YOUR APP NAME
                        </h1>{" "}
                        {/* Customize */}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center w-screen md:w-full bg-white px-6 py-12 md:px-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <Link to="/" >
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 cursor-pointer">NAWA</h1>
                        </Link>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to your account
                        </p>
                        {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                        )}{" "}
                        {/* Error display */}
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                    >
                        <div className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 h-12 border-gray-300 bg-gray-50 focus:border-gray-500 focus:ring-gray-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </Label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-xs font-medium text-gray-600 hover:text-gray-900"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                        className=" mt-1 h-12 border-gray-300 bg-gray-50 focus:border-gray-500 focus:ring-gray-500"
                                        placeholder="Enter your password"
                                    />
                                    <Button
                                        onClick={handleShowAndHidePassword}
                                        type="button"
                                        variant="none"
                                        size="icon"
                                        className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-lg px-5 py-2.5  
                                        !border-none !outline-none !ring-0 !shadow-none
                                        focus:!border-none focus:!outline-none focus:!ring-0 focus:!shadow-none
                                        focus-visible:!border-none focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!shadow-none
                                        hover:!border-none hover:!ring-0
                                        active:!border-none active:!ring-0
                                        !bg-transparent"
                                    >
                                        {showPassword ? 
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="#000"
                                        >
                                            <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                        </svg>
                                       : 
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="#000"
                                        >
                                            <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                                        </svg>
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                type="submit"
                                className="h-12 w-full bg-black text-white hover:bg-gray-800"
                            >
                                Sign In
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="default"
                                onClick={handleGoogleLogin}
                                className="flex h-12 w-full items-center justify-center border border-gray-300 text-white"
                            >
                                <svg
                                    className="mr-2 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    {/* Google SVG (unchanged) */}
                                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                        <path
                                            fill="#4285F4"
                                            d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                                        />
                                    </g>
                                </svg>
                                Sign in with Google
                            </Button>
                        </div>

                        <div className="text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            {/* Use react-router-dom Link or standard <a> tag */}
                            <Link
                                to="/signup" // Update to your route
                                className="font-medium text-black hover:text-gray-800"
                            >
                                Create account
                            </Link>
                            {/* If not using react-router-dom, use <a> (uncomment if needed) */}
                            {/* <a
                href="/signup"
                className="font-medium text-black hover:text-gray-800"
              >
                Create account
              </a> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
