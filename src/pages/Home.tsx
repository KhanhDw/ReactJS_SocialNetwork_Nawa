import { useState, useEffect } from "react";
import "../assets/css/home.css";
import { useLocation } from "react-router-dom";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiUserFollowFill } from "react-icons/ri";
import { RiFlowerFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { PiPen } from "react-icons/pi";
import { IoMdImages } from "react-icons/io";
import { TiVideo } from "react-icons/ti";
import PostCard from "@/components/feature/post-card/PostCard";
import { useHeaderScroll } from "../hooks/useHeaderScroll";
import Comment from "@/components/feature/comment/Comment";
import { Chat, type Message } from "@/components/feature/chat/chat";
import { BsPostcardHeartFill } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Following from "@/components/feature/following/following";
import FollowMe from "@/components/feature/following/followMe";
// import { MdWork } from "react-icons/md";
import FilterSidebar from "@/components/feature/FilterSidebar/AdvancedFilterSidebar";
import "@/assets/css/scrollbarCustomer.css";
import ListLearning from "@/components/feature/Learning/listLearning";
import RightSide from "@/components/feature/community/RightSide";
interface Post {
    id: string;
    author: {
        name: string;
        group: string;
        avatar: string;
        timestamp: string;
    };
    title: string;
    content: string;
    images?: string[];
    tags: string[];
    reactions: {
        like: number;
        heart: number;
        smile: number;
        surprise: number;
        sad: number;
        angry: number;
    };
    stats: {
        views: number;
        comments: number;
        shares: number;
    };
}

interface ListUserAndGroupChat {
    id: number;
    username: string;
    avatar: string;
}

function Home() {
    const { isScrolled_top, isScrolled_height } = useHeaderScroll();
    const [isOpenComment, setIsOpenComment] = useState<boolean>(false);
    const location = useLocation();

    // const [message, setMessage] = useState("");
    // Use useState for hideHeader

    // Use useState for hideHeader
    const [hideHeader, setHideHeader] = useState<boolean>(
        location.pathname === "/chat" ||
            location.pathname === "/learning" ||
            location.pathname === "/community"
    );

    // Update hideHeader when location.pathname changes
    useEffect(() => {
        setHideHeader(
            location.pathname === "/chat" ||
                location.pathname === "/learning" ||
                location.pathname === "/community"
        );
        // const sayHello = async () => {
        //     const res = await fetch("http://localhost:3000/api/message");
        //     const text = await res.text();
        //     setMessage(text);
        // };
        // sayHello();
    }, [location.pathname]);

    const [isActiveShowListUserChat, setIsActiveShowListUserChat] =
        useState<number>(1);

    const navigate = [
        {
            id: 1,
            name: "Bài viết",
            url: "/",
            icon: <BsPostcardHeartFill className="w-8 h-8 rounded-full" />,
        },
        {
            id: 2,
            name: "Tin nhắn",
            url: "/chat",
            icon: <AiFillMessage className="w-8 h-8 rounded-full" />,
        },
        {
            id: 3,
            name: "Cộng đồng",
            url: "/community",
            icon: <FaPeopleGroup className="w-8 h-8 rounded-full" />,
        },
        {
            id: 4,
            name: "Theo dõi",
            url: "/following",
            icon: <RiUserFollowFill className="w-8 h-8 rounded-full" />,
        },
        {
            id: 5,
            name: "Học hỏi",
            url: "/learning",
            icon: <RiFlowerFill className="w-8 h-8" />,
        },
        // {
        //     id: 6,
        //     name: "Việc làm",
        //     url: "/",
        //     icon: <MdWork className="w-8 h-8" />,
        // },
    ];

    const posts: Post[] = [
        {
            id: "1",
            author: {
                name: "Nguyễn Văn Thành",
                group: "Nguyễn Văn ThànhNguyễn Văn ThànhNguyễn Văn Thành",
                avatar: "/bannerLogin.png",
                timestamp: "Jun 12, 2022",
            },
            title: "Hôm nay thật là một ngày tuyệt vời!",
            content:
                "Cảm ơn tất cả mọi người đã chúc mừng sinh nhật mình. Thật sự rất hạnh phúc khi được mọi người quan tâm và yêu thương như vậy 🎉ảm ơn tất cả mọi người đã chúc mừng sinh nhật mình. Thật sự rất hạnh phúc khi được mọi người quan tâm và yêu thương như vậy 🎉Cảm ơn tất cả mọi người đã chúc mừng sinh nhật mình. Thật sự rất hạnh phúc khi được mọi người quan tâm và yêu thương như vậy 🎉Cảm ơn tất cả mọi người đã chúc mừng sinh nhật mình. Thật sự rất hạnh phúc khi được mọi người quan tâm và yêu thương như vậy 🎉Cảm ơn tất cả mọi người đã chúc mừng sinh nhật mình. Thật sự rất hạnh phúc khi được mọi người quan tâm và yêu thương như vậy 🎉Cảm ơn tất cả mọi người đã chúc mừng sinh nhật mình. Thật sự rất hạnh phúc khi được mọi người quan tâm và yêu thương như vậy 🎉",
            images: ["/bannerLogin.png", "/bannerLogin.png"],
            tags: ["sinh nhật", "hạnh phúc", "cảm ơn"],
            reactions: {
                like: 24,
                heart: 15,
                smile: 8,
                surprise: 3,
                sad: 0,
                angry: 0,
            },
            stats: {
                views: 1200,
                comments: 8,
                shares: 2,
            },
        },
        {
            id: "2",
            author: {
                name: "Nguyễn Văn Thành",
                group: "Nguyễn Văn Thành",
                avatar: "/bannerLogin.png",
                timestamp: "Jun 10, 2022",
            },
            title: "Dự án mới đã hoàn thành!",
            content:
                "Vừa hoàn thành dự án mới, cảm thấy rất hài lòng với kết quả! Cảm ơn team đã hỗ trợ nhiệt tình 💪",
            images: ["/bannerLogin.png"],
            tags: ["công việc", "thành công", "team work"],
            reactions: {
                like: 15,
                heart: 8,
                smile: 12,
                surprise: 2,
                sad: 0,
                angry: 0,
            },
            stats: {
                views: 800,
                comments: 5,
                shares: 1,
            },
        },
        {
            id: "3",
            author: {
                name: "Nguyễn Văn Thành",
                group: "Nguyễn Văn Thành",
                avatar: "/bannerLogin.png",
                timestamp: "Jun 8, 2022",
            },
            title: "Cuối tuần tuyệt vời ở Đà Lạt",
            content:
                "Cuối tuần đi du lịch Đà Lạt cùng gia đình. Thời tiết thật tuyệt vời, không khí trong lành và nhiều cảnh đẹp! 🌸",
            images: [
                "/bannerLogin.png",
                "/bannerLogin.png",
                "/bannerLogin.png",
            ],
            tags: ["du lịch", "Đà Lạt", "gia đình", "cuối tuần"],
            reactions: {
                like: 32,
                heart: 28,
                smile: 15,
                surprise: 5,
                sad: 0,
                angry: 0,
            },
            stats: {
                views: 1500,
                comments: 12,
                shares: 5,
            },
        },
    ];

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            type: "system",
            content: "Cuộc trò chuyện bắt đầu",
            sender: { id: "system", name: "System" },
            timestamp: new Date(Date.now() - 3600000),
            isOwn: false,
        },
        {
            id: "2",
            type: "text",
            content:
                "Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?Chào bạn! Bạn có khỏe không?",
            sender: {
                id: "user1",
                name: "Minh Anh",
                avatar: "./bannerLogin.png",
            },
            timestamp: new Date(Date.now() - 1800000),
            isOwn: false,
            status: "read",
        },
        {
            id: "3",
            type: "text",
            content: "Chào Minh Anh! Mình khỏe, cảm ơn bạn đã hỏi thăm 😊",
            sender: {
                id: "user2",
                name: "Bạn",
                avatar: "./bannerLogin.png",
            },
            timestamp: new Date(Date.now() - 1700000),
            isOwn: true,
            status: "read",
        },
        {
            id: "4",
            type: "text",
            content: "Hôm nay bạn có kế hoạch gì không?",
            sender: {
                id: "user1",
                name: "Minh Anh",
                avatar: "./bannerLogin.png",
            },
            timestamp: new Date(Date.now() - 1600000),
            isOwn: false,
            status: "read",
        },
        {
            id: "5",
            type: "image",
            content: "Mình đang ở công viên này đây!",
            sender: {
                id: "user2",
                name: "Bạn",
                avatar: "./bannerLogin.png",
            },
            timestamp: new Date(Date.now() - 900000),
            isOwn: true,
            status: "delivered",
            attachment: {
                type: "image",
                url: "./bannerLogin.png",
            },
        },
        {
            id: "6",
            type: "text",
            content: "Wow, trông đẹp quá! Mình cũng muốn đi dạo",
            sender: {
                id: "user1",
                name: "Minh Anh",
                avatar: "./bannerLogin.png",
            },
            timestamp: new Date(Date.now() - 600000),
            isOwn: false,
            status: "read",
        },
        {
            id: "7",
            type: "file",
            content: "Mình gửi bạn file địa chỉ nhé",
            sender: {
                id: "user2",
                name: "Bạn",
                avatar: "./bannerLogin.png",
            },
            timestamp: new Date(Date.now() - 300000),
            isOwn: true,
            status: "sent",
            attachment: {
                type: "file",
                url: "#",
                name: "dia-chi-cong-vien.pdf",
            },
        },
        {
            id: "8",
            type: "text",
            content: "Đang gõ tin nhắn...",
            sender: {
                id: "user2",
                name: "Bạn",
                avatar: "./bannerLogin.png",
            },
            timestamp: new Date(),
            isOwn: true,
            status: "sending",
        },
        {
            id: "9",
            type: "link",
            content:
                "Bạn xem link này nhé: https://example.com/article và https://github.com/user/repo",
            sender: {
                id: "user1",
                name: "Minh Anh",
                avatar: "./bannerLogin.png",
            },
            timestamp: new Date(Date.now() - 200000),
            isOwn: false,
            status: "read",
        },
        {
            id: "10",
            type: "gallery",
            content: "Một số ảnh từ chuyến đi hôm qua",
            sender: {
                id: "user2",
                name: "Bạn",
                avatar: "./bannerLogin.png",
            },
            timestamp: new Date(Date.now() - 100000),
            isOwn: true,
            status: "delivered",
            gallery: {
                images: [
                    "./bannerLogin.png",
                    "./bannerLogin.png",
                    "./bannerLogin.png",
                    "./bannerLogin.png",
                    "./bannerLogin.png",
                    "./bannerLogin.png",
                ],
                caption: "Chuyến đi thật tuyệt vời!",
            },
        },
    ]);

    const listUser: ListUserAndGroupChat[] = [
        { id: 1, avatar: "./bannerLogin.png", username: "User 1" },
        { id: 2, avatar: "./bannerLogin.png", username: "User 2" },
        { id: 3, avatar: "./bannerLogin.png", username: "User 3" },
        { id: 4, avatar: "./bannerLogin.png", username: "User 4" },
        { id: 5, avatar: "./bannerLogin.png", username: "User 5" },
        { id: 6, avatar: "./bannerLogin.png", username: "User 6" },
        { id: 7, avatar: "./bannerLogin.png", username: "User 7" },
        { id: 8, avatar: "./bannerLogin.png", username: "User 8" },
        { id: 9, avatar: "./bannerLogin.png", username: "User 9" },
        { id: 10, avatar: "./bannerLogin.png", username: "User 10" },
        { id: 11, avatar: "./bannerLogin.png", username: "User 11" },
        { id: 12, avatar: "./bannerLogin.png", username: "User 12" },
        { id: 13, avatar: "./bannerLogin.png", username: "User 13" },
        { id: 14, avatar: "./bannerLogin.png", username: "User 14" },
        { id: 15, avatar: "./bannerLogin.png", username: "User 15" },
        { id: 16, avatar: "./bannerLogin.png", username: "User 16" },
        { id: 17, avatar: "./bannerLogin.png", username: "User 17" },
        { id: 18, avatar: "./bannerLogin.png", username: "User 18" },
        { id: 19, avatar: "./bannerLogin.png", username: "User 19" },
        { id: 20, avatar: "./bannerLogin.png", username: "User 20" },
        { id: 21, avatar: "./bannerLogin.png", username: "User 21" },
        { id: 22, avatar: "./bannerLogin.png", username: "User 22" },
    ];
    const listGroup: ListUserAndGroupChat[] = [
        { id: 1, avatar: "./bannerLogin.png", username: "group 1" },
        { id: 2, avatar: "./bannerLogin.png", username: "group 2" },
        { id: 3, avatar: "./bannerLogin.png", username: "group 3" },
        { id: 4, avatar: "./bannerLogin.png", username: "group 4" },
        { id: 5, avatar: "./bannerLogin.png", username: "group 5" },
        { id: 6, avatar: "./bannerLogin.png", username: "group 6" },
        { id: 7, avatar: "./bannerLogin.png", username: "group 7" },
        { id: 8, avatar: "./bannerLogin.png", username: "group 8" },
        { id: 9, avatar: "./bannerLogin.png", username: "group 9" },
        { id: 10, avatar: "./bannerLogin.png", username: "group 10" },
        { id: 11, avatar: "./bannerLogin.png", username: "group 11" },
        { id: 12, avatar: "./bannerLogin.png", username: "group 12" },
        { id: 13, avatar: "./bannerLogin.png", username: "group 13" },
        { id: 14, avatar: "./bannerLogin.png", username: "group 14" },
        { id: 15, avatar: "./bannerLogin.png", username: "group 15" },
        { id: 16, avatar: "./bannerLogin.png", username: "group 16" },
        { id: 17, avatar: "./bannerLogin.png", username: "group 17" },
        { id: 18, avatar: "./bannerLogin.png", username: "group 18" },
        { id: 19, avatar: "./bannerLogin.png", username: "group 19" },
        { id: 20, avatar: "./bannerLogin.png", username: "group 20" },
        { id: 21, avatar: "./bannerLogin.png", username: "group 21" },
        { id: 22, avatar: "./bannerLogin.png", username: "group 22" },
    ];

    const [isShowListUser, setIsShowListUser] =
        useState<ListUserAndGroupChat[]>(listUser);

    const handleShowUsers = () => {
        setIsShowListUser(listUser);
        setIsActiveShowListUserChat(1);
    };

    const handleShowGroups = () => {
        setIsShowListUser(listGroup);
        setIsActiveShowListUserChat(2);
    };

    const handleSendMessage = (content: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            type: "text",
            content,
            sender: {
                id: "user2",
                name: "Bạn",
                avatar: "./bannerLogin.png",
            },
            timestamp: new Date(),
            isOwn: true,
            status: "sending",
        };

        setMessages((prev) => [...prev, newMessage]);

        // Simulate message status updates
        setTimeout(() => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
                )
            );
        }, 1000);

        setTimeout(() => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === newMessage.id
                        ? { ...msg, status: "delivered" }
                        : msg
                )
            );
        }, 2000);
    };

    return (
        <>
            <div className=" flex items-start justify-center min-h-screen bg-gray-800 text-gray-300 ">
                <div
                    style={{
                        top: hideHeader ? 0 : `${isScrolled_top}px`,
                        height: hideHeader ? "100vh" : isScrolled_height,
                    }}
                    className={` sidebar_home flex-1 bg-gray-800  sticky  overflow-auto p-4 border-amber-100 cursor-default`}
                >
                    {/* chỉ hiển thị khi scoll xuống */}
                    <div
                        className={`{${
                            hideHeader
                                ? "max-h-screen opacity-100"
                                : isScrolled_top > 0
                                ? "max-h-0 opacity-0"
                                : "max-h-screen opacity-100"
                        } overflow-hidden flex items-center justify-between flex-col w-full duration-300 transition-all ease-in-out`}
                    >
                        <div
                            className={` w-full flex items-center justify-between gap-3 duration-300 transition-all ease-in-out`}
                        >
                            {/* Logo */}
                            <div
                                className={`w-1/2 flex items-center justify-center gap-3 p-2 border-2 hover:bg-gray-600/20 hover:cursor-pointer border-transparent hover:border-gray-600 rounded-sm
                            `}
                            >
                                <Link
                                    to="/"
                                    className="text-white text-xl font-bold"
                                >
                                    {/* <img src="/logo.png" alt="Logo" className="h-8 w-auto" /> */}
                                    <h1
                                        style={{
                                            fontFamily:
                                                '"Rubik Dirt", system-ui',
                                            fontWeight: 900,
                                            fontStyle: "normal",
                                        }}
                                        className="w-full text-center"
                                    >
                                        NAWA
                                    </h1>
                                </Link>
                            </div>
                            {/* Logo */}
                            <div className="w-1/2 flex items-center justify-center gap-3 p-2 border-2 hover:bg-gray-600/20 hover:cursor-pointer border-transparent hover:border-gray-600 rounded-sm">
                                <Link
                                    to="/"
                                    className="text-white text-xl font-bold"
                                >
                                    {/* <img src="/logo.png" alt="Logo" className="h-8 w-auto" /> */}
                                    <h1 className=" w-full text-center flex gap-3 items-center">
                                        <MdOutlineShoppingCartCheckout className="w-full text-center" />
                                        <span className="text-md">Shop</span>
                                    </h1>
                                </Link>
                            </div>
                        </div>
                        {/* Tìm kiếm */}
                        <div
                            className={` flex-1 my-3 max-w-xl relative w-[90%]`}
                        >
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="hover:bg-[#49454b] rounded-2xl transition-all duration-300 w-full px-4 py-2  bg-[#1F1F1F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <Button
                                type="button"
                                variant="none"
                                className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2"
                            >
                                <AiOutlineSearch className=" w-12 h-12 text-[#a898af]" />
                            </Button>
                        </div>
                    </div>

                    {/* luôn hiên thị */}
                    <div
                        className={`${
                            hideHeader
                                ? "max-h-screen opacity-100"
                                : isScrolled_top < 60
                                ? "translate-y-0 "
                                : "-translate-y-28 "
                        } duration-300 transition-all ease-in-out`}
                    >
                        {/* avarta */}
                        <Link
                            to={"/profile"}
                            className="w-full"
                        >
                            <div className=" flex items-center justify-start gap-3 p-2 border-2 hover:bg-gray-600/20 hover:cursor-pointer border-transparent hover:border-gray-600 rounded-sm">
                                <img
                                    src="https://avatars.githubusercontent.com/u/1024101?v=4"
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full"
                                />

                                <h1 className="text-md font-bold truncate">
                                    Ngô Nguyễn Gia Khánh Khánh
                                </h1>
                            </div>
                        </Link>

                        {navigate.map((item, index) => (
                            <Link
                                to={`${item.url}`}
                                key={index}
                                className="w-full flex items-center justify-start gap-3 p-2 border-2 hover:bg-gray-600/20 hover:cursor-pointer border-transparent hover:border-gray-600 rounded-sm"
                            >
                                {item.icon}
                                <h1 className="text-md font-bold truncate">
                                    {item.name}
                                </h1>
                            </Link>
                        ))}
                    </div>
                </div>
                {/* main */}
                <div
                    className={`${
                        location.pathname === "/chat" ||
                        location.pathname === "/learning"
                            ? "overflow-hidden"
                            : ""
                    } ${
                        location.pathname !== "/learning" ? "pt-4" : ""
                    } home_page1 flex-2 min-h-screen overflow-hidden scroll-container bg-gray-800 px-4  border-x-3 border-gray-800  `}
                >
                    {/* LIST POST = url: / */}
                    {location.pathname === "/" && (
                        <div className="space-y-6">
                            {posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    setIsOpenComment={setIsOpenComment}
                                />
                            ))}
                        </div>
                    )}
                    {/* Chat = url: /chat*/}
                    {location.pathname === "/chat" && (
                        <div
                            className={`w-full h-[calc(100vh-3vh)] mx-auto flex flex-col bg-[#1c1a2c]  rounded-2xl`}
                        >
                            <Chat
                                title="Minh Anh"
                                messages={messages}
                                onSendMessage={handleSendMessage}
                            />
                        </div>
                    )}
                    {/* following = url: /following */}
                    {location.pathname === "/following" && <Following />}
                    {/* learning = url: /learning */}
                    {location.pathname === "/learning" && <ListLearning />}
                    {/* learning = url: /community */}
                    {location.pathname === "/community" && (
                        <div>
                            {posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    setIsOpenComment={setIsOpenComment}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* sidebar right */}
                <div
                    style={{
                        top: hideHeader ? 0 : `${isScrolled_top}px`,
                        height: hideHeader ? "100vh" : isScrolled_height,
                    }}
                    className={`${
                        location.pathname === "/chat" ||
                        location.pathname === "/"
                            ? "pr-4 pt-4"
                            : ""
                    } sidebar_home flex-1 bg-gray-800 sticky overflow-auto border-amber-100 cursor-default`}
                >
                    {/* post new */}
                    {location.pathname === "/" && (
                        <div
                            className={`${
                                isOpenComment ? "hidden" : "block"
                            } rounded-lg bg-gray-900 p-4 mb-4`}
                        >
                            <h1 className="text-md font-bold mb-4">
                                Đăng bài viết nào
                            </h1>
                            <div className="flex items-center justify-between gap-2 w-full">
                                <div className="w-1/3 flex flex-col items-center justify-start gap-3 p-2 border-2 hover:bg-gray-600/20 hover:cursor-pointer border-transparent hover:border-gray-600 rounded-sm">
                                    <PiPen className="text-4xl" />
                                    <p className="text-gray-400 text-sm">
                                        Bài Viết
                                    </p>
                                </div>
                                <div className="w-1/3 flex flex-col items-center justify-start gap-3 p-2 border-2 hover:bg-gray-600/20 hover:cursor-pointer border-transparent hover:border-gray-600 rounded-sm">
                                    <IoMdImages className="text-4xl" />
                                    <p className="text-gray-400 text-sm ">
                                        Hình Ảnh
                                    </p>
                                </div>
                                <div className="w-1/3 flex flex-col items-center justify-start gap-3 p-2 border-2 hover:bg-gray-600/20 hover:cursor-pointer border-transparent hover:border-gray-600 rounded-sm">
                                    <TiVideo className="text-4xl" />
                                    <p className="text-gray-400 text-sm">
                                        Video
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* comment */}
                    {
                        <div
                            className={`${isOpenComment ? "block" : "hidden"} ${
                                isScrolled_top > 40
                                    ? "h-[calc(100vh-12vh)]"
                                    : "h-[calc(100vh-5vh)]"
                            } w-full mx-auto flex flex-col bg-[#1c1a2c] rounded-2xl m-4`}
                        >
                            <Comment
                                isOpenComment={isOpenComment}
                                setIsOpenComment={setIsOpenComment}
                            />
                        </div>
                    }
                    {/* chat - list user and group */}
                    {hideHeader && location.pathname === "/chat" && (
                        <div
                            className={`h-[calc(100vh-5vh)] w-full mx-auto flex flex-col bg-[#1c1a2c] rounded-2xl`}
                        >
                            {/* header */}
                            <div className="flex items-center justify-between p-2 border-b border-gray-700 w-full">
                                <button
                                    type="button"
                                    onClick={handleShowUsers}
                                    className={`flex items-center justify-center p-2 w-1/2 rounded-tl-2xl hover:text-blue-300 cursor-pointer font-bold ${
                                        isActiveShowListUserChat === 1
                                            ? "bg-gray-800"
                                            : ""
                                    }`}
                                >
                                    Cá Nhân
                                </button>
                                <button
                                    type="button"
                                    onClick={handleShowGroups}
                                    className={`flex items-center justify-center p-2 w-1/2 rounded-tr-2xl hover:text-blue-300 cursor-pointer font-bold ${
                                        isActiveShowListUserChat === 2
                                            ? "bg-gray-800"
                                            : ""
                                    }`}
                                >
                                    Nhóm
                                </button>
                            </div>
                            {/* list user */}
                            <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2 scroll-container">
                                {isShowListUser.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between gap-2 p-2 hover:bg-gray-700/20 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage
                                                    src={user.avatar}
                                                    alt={user.username}
                                                />
                                                <AvatarFallback>
                                                    {user.username
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-semibold">
                                                {user.username}
                                            </span>
                                        </div>
                                        <div className="text-sm font-bold text-green-500 rounded-full">
                                            {/* Replace with condition to show new message status */}
                                            <p>2</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* following = url: /following */}
                    {location.pathname === "/following" && <FollowMe />}
                    {hideHeader && location.pathname === "/learning" && (
                        <div
                            className={`h-[calc(100vh-5vh)] w-full mx-auto flex flex-col bg-[#1c1a2c] rounded-2xl`}
                        >
                            <FilterSidebar />
                        </div>
                    )}
                    {hideHeader && location.pathname === "/community" && (
                        <div
                            className={`${
                                isOpenComment ? "hidden" : "block"
                            } h-screen w-full  mx-auto flex flex-col bg-[#1c1a2c] rounded-2xl`}
                        >
                            <RightSide />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;
