import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { RiQuillPenFill, RiQuillPenAiFill } from "react-icons/ri";
import { PiShoppingCartFill } from "react-icons/pi";
import { AiOutlineSearch } from "react-icons/ai";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { PiPen } from "react-icons/pi";
import { IoMdImages } from "react-icons/io";
import { TiVideo } from "react-icons/ti";
import { RiArrowRightSLine } from "react-icons/ri";
import Notifications from "@/components/feature/notifications/notifications";
import { TbReport } from "react-icons/tb";
function Header() {
    const [isLogin, setIsLogin] = useState(false);

    const [isOpenMenuPost, setIsOpenMenuPost] = useState(false);
    const [isHoveredWritePost, setIsHoveredWritePost] = useState(false);

    const [isOpenMenuNotification, setIsOpenMenuNotification] = useState(false);
    const [isOpenMenuNotificationDetail, setIsOpenMenuNotificationDetail] =
        useState(false);

    const [isOpenMenuCart, setIsOpenMenuCart] = useState(false);
    const [isOpenMenuCartDetail, setIsOpenMenuCartDetail] = useState(false);

    const [isOpenMenuAvarta, setIsOpenMenuAvarta] = useState(false);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 ease-in-out transition-all duration-100 bg-[#282C34]`}
            >
                <Helmet>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="anonymous"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Rubik+Dirt&display=swap"
                        rel="stylesheet"
                    />
                </Helmet>
                <nav className="py-2  flex items-center justify-between mx-auto w-full px-10  ">
                    {/* Logo + Menu */}
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className="text-white text-xl font-bold mr-16"
                        >
                            {/* <img src="/logo.png" alt="Logo" className="h-8 w-auto" /> */}
                            <h1
                                style={{
                                    fontFamily: '"Rubik Dirt", system-ui',
                                    fontWeight: 900,
                                    fontStyle: "normal",
                                }}
                            >
                                NAWA
                            </h1>
                        </Link>
                        <Link
                            to="/"
                            className="text-[#E0E0E0] font-bold hover:text-amber-500 transition-colors duration-300"
                        >
                            Trang chủ
                        </Link>
                        <Link
                            to="/shopping"
                            className="text-[#E0E0E0] font-bold hover:text-amber-500 transition-colors duration-300"
                        >
                            Đi shopping
                        </Link>
                    </div>

                    {/* Tìm kiếm */}
                    <div className="flex-1 px-6 max-w-xl relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="hover:bg-[#49454b] rounded-2xl transition-all duration-300 w-full px-4 py-2  bg-[#1F1F1F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <Button
                            type="button"
                            variant="none"
                            className="absolute cursor-pointer right-8 top-1/2 transform -translate-y-1/2"
                        >
                            <AiOutlineSearch className=" w-12 h-12 text-[#a898af]" />
                        </Button>{" "}
                    </div>

                    {/* Nút bên phải */}
                    <div className="flex items-center space-x-10 ">
                        <div
                            className="relative z-99999999 "
                            onMouseEnter={() => {
                                setIsOpenMenuPost(true);
                                setIsHoveredWritePost(true);
                            }}
                            onMouseLeave={() => {
                                setIsOpenMenuPost(false);
                                setIsHoveredWritePost(false);
                            }}
                        >
                            <button
                                className={
                                    isOpenMenuPost
                                        ? "text-yellow-300 cursor-pointer px-3 py-1 bg-blue-100/40 rounded-full duration-300 transition-all"
                                        : "text-white cursor-pointer px-3 py-1"
                                }
                            >
                                {isHoveredWritePost ? (
                                    <RiQuillPenAiFill className="w-6 h-6" />
                                ) : (
                                    <RiQuillPenFill className="w-6 h-6" />
                                )}
                            </button>
                            {isOpenMenuPost && (
                                // phần này để cầu nối giữa avarta và menu - sẽ transparent
                                <div className="h-20 w-50 bg-transparent absolute right-0"></div>
                            )}
                            {isOpenMenuPost && (
                                <ul
                                    className={`menu-container p-2 w-56 bg-gray-600 ${
                                        isOpenMenuPost
                                            ? "menu-enter-active"
                                            : "menu-enter"
                                    }`}
                                >
                                    {["Bài Viết", "Hình Ảnh", "Video"].map(
                                        (label, index) => {
                                            const Icon = [
                                                PiPen,
                                                IoMdImages,
                                                TiVideo,
                                            ][index];
                                            return (
                                                <li
                                                    key={label}
                                                    className="menu-item flex items-center py-1 justify-between transition-all duration-300"
                                                >
                                                    <div className="bg-gray-500/70 hover:text-gray-100 text-gray-300 w-full flex items-center justify-between gap-3 p-2 border-2 border-transparent rounded-sm hover:bg-gray-700 cursor-pointer">
                                                        <div className="flex items-center gap-3 w-full ">
                                                            <Icon className="text-4xl " />
                                                            <p className=" text-sm">
                                                                {label}
                                                            </p>
                                                        </div>
                                                        <RiArrowRightSLine className="text-4xl " />
                                                    </div>
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>
                            )}
                        </div>
                        <div
                            className="relative"
                            onMouseEnter={() => {
                                setIsOpenMenuNotification(true);
                                setIsOpenMenuNotificationDetail(true);
                            }}
                            onMouseLeave={() => {
                                setIsOpenMenuNotification(false);
                                setIsOpenMenuNotificationDetail(false);
                            }}
                        >
                            <button
                                className={
                                    isOpenMenuNotificationDetail
                                        ? "text-yellow-300 cursor-pointer px-3 py-1 bg-blue-100/40 rounded-full duration-300 transition-all"
                                        : "text-white relative cursor-pointer px-3 py-1"
                                }
                            >
                                <FaBell className="w-6 h-6" />
                                <h6 className="text-white rounded-2xl absolute -right-4 top-1 transform -translate-y-1/2 bg-red-600 text-xs px-1">
                                    50+
                                </h6>
                            </button>
                            {isOpenMenuNotification && (
                                // phần này để cầu nối giữa avarta và menu - sẽ transparent
                                <div className="h-20 w-50 bg-transparent absolute right-0"></div>
                            )}
                            {isOpenMenuNotification && (
                                <div
                                    className={`menu-container w-120 ${
                                        isOpenMenuNotification
                                            ? "menu-enter-active"
                                            : "menu-enter"
                                    }`}
                                >
                                    <Notifications />
                                </div>
                            )}
                        </div>
                        <div
                            className="relative"
                            onMouseEnter={() => {
                                setIsOpenMenuCart(true);
                                setIsOpenMenuCartDetail(true);
                            }}
                            onMouseLeave={() => {
                                setIsOpenMenuCart(false);
                                setIsOpenMenuCartDetail(false);
                            }}
                        >
                            <button
                                className={
                                    isOpenMenuCartDetail
                                        ? "text-yellow-300 cursor-pointer px-3 py-1 bg-blue-100/40 rounded-full duration-300 transition-all"
                                        : "text-white relative cursor-pointer px-3 py-1"
                                }
                            >
                                <PiShoppingCartFill className="w-6 h-6" />
                            </button>
                            {isOpenMenuCart && (
                                // phần này để cầu nối giữa avarta và menu - sẽ transparent
                                <div className="h-20 w-50 bg-transparent absolute right-0"></div>
                            )}
                            {isOpenMenuCart && (
                                <ul
                                    className={`menu-container w-56 flex flex-col gap-2 p-1  ${
                                        isOpenMenuCart
                                            ? "menu-enter-active"
                                            : "menu-enter"
                                    }`}
                                >
                                    <li className="menu-item flex items-center justify-between bg-gray-300/20  h-15  px-3  hover:bg-gray-400 transition-all duration-300">
                                        <p className="text-gray-100">
                                            Xem đơn hàng
                                        </p>
                                        <TbReport className="w-9 h-9 bg-green-300 px-2 rounded-full" />
                                    </li>
                                    <li className="menu-item flex items-center justify-between bg-gray-300/20 h-15  px-3  hover:bg-gray-400 transition-all duration-300">
                                        <p className="text-gray-100">
                                            Xem giỏ hàng{" "}
                                        </p>
                                        <p className="text-white bg-red-700 text-bold px-2 rounded-full">
                                            99+
                                        </p>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div
                            className="relative"
                            onMouseEnter={() => setIsOpenMenuAvarta(true)}
                            onMouseLeave={() => setIsOpenMenuAvarta(false)}
                        >
                            <img
                                onClick={() => setIsLogin(!isLogin)}
                                src={
                                    isLogin
                                        ? "/bannerLogin.png"
                                        : "/default-avatar.png"
                                }
                                alt="User Avatar"
                                className="h-12 w-12 rounded-full border-2 border-[#ffffff] cursor-pointer"
                            />
                            {isOpenMenuAvarta && (
                                // phần này để cầu nối giữa avarta và menu - sẽ transparent
                                <div className="h-20 w-50 bg-transparent absolute right-0"></div>
                            )}
                            {isOpenMenuAvarta && (
                                <ul
                                    className={`menu-container w-42 text-white  p-2 ${
                                        isOpenMenuAvarta
                                            ? "menu-enter-active"
                                            : "menu-enter"
                                    }`}
                                >
                                    <li className="menu-item py-2 px-3  hover:bg-gray-500 ">
                                        Trang cá nhân
                                    </li>
                                    <li className="menu-item py-2 px-3  hover:bg-gray-500 ">Cài đặt</li>
                                    <li className="menu-item py-2 px-3  hover:bg-gray-500 ">Đăng xuất</li>
                                    <li className="menu-item py-2 px-3  hover:bg-gray-500 ">
                                        <Link
                                            to="/login"
                                            className="text-[#000000] font-bold  transition-colors duration-300"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;
