"use client";

import { useState, useEffect, useRef } from "react";
import {
    Camera,
    MapPin,
    Briefcase,
    Heart,
    Calendar,
    Clock,
    Bookmark,
    GamepadIcon,
    ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostCard from "@/components/feature/post-card/PostCard";
import { MdPeopleAlt } from "react-icons/md";
import Comment from "@/components/feature/comment/Comment";
import { IoMdImages } from "react-icons/io";
import { TiVideo } from "react-icons/ti";
import { IoIosPlayCircle } from "react-icons/io";
interface Post {
    id: string;
    author: {
        name: string;
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

interface Friend {
    id: string;
    name: string;
    avatar: string;
    mutualFriends?: number;
    isOnline?: boolean;
}

export default function FacebookProfile() {
    const [activeTab, setActiveTab] = useState("posts");
    const [isOpenComment, setIsOpenComment] = useState(false);
    const stickyRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (stickyRef.current) {
                const rect = stickyRef.current.getBoundingClientRect();
                // Kiểm tra nếu phần tử sticky đang ở trạng thái "bám"
                setIsSticky(rect.top <= 20);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // header navigation
    const listItemComponent = [
        { key: "posts", label: "Bài viết" },
        { key: "about", label: "Giới thiệu" },
        {
            key: "friends",
            label: "Theo dõi",
        },
        { key: "photos", label: "Ảnh" },
        { key: "videos", label: "Video" },
        { key: "postSave", label: "Bài viết đã lưu" },
        { key: "community", label: "Cộng đồng" },
    ];

    const posts: Post[] = [
        {
            id: "1",
            author: {
                name: "Nguyễn Văn Thành",
                avatar: "/bannerLogin.png",
                timestamp: "Jun 12, 2022",
            },
            title: "Hôm nay thật là một ngày tuyệt vời!",
            content:
                "Cảm ơn tất cả mọi người đã chúc mừng sinh nhật mình. Thật sự rất hạnh phúc khi được mọi người quan tâm và yêu thương như vậy 🎉",
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

    const friends: Friend[] = [
        {
            id: "1",
            name: "Nguyễn Văn A",
            avatar: "/placeholder.svg?height=100&width=100",
            mutualFriends: 12,
            isOnline: true,
        },
        {
            id: "2",
            name: "Trần Thị B",
            avatar: "/placeholder.svg?height=100&width=100",
            mutualFriends: 8,
            isOnline: false,
        },
        {
            id: "3",
            name: "Lê Văn C",
            avatar: "/placeholder.svg?height=100&width=100",
            mutualFriends: 15,
            isOnline: true,
        },
        {
            id: "4",
            name: "Phạm Thị D",
            avatar: "/placeholder.svg?height=100&width=100",
            mutualFriends: 6,
            isOnline: false,
        },
        {
            id: "5",
            name: "Hoàng Văn E",
            avatar: "/placeholder.svg?height=100&width=100",
            mutualFriends: 9,
            isOnline: true,
        },
        {
            id: "6",
            name: "Vũ Thị F",
            avatar: "/placeholder.svg?height=100&width=100",
            mutualFriends: 4,
            isOnline: false,
        },
    ];

    const photos = [
        "/bannerLogin.png",
        "/bannerLogin.png",
        "/bannerLogin.png",
        "/bannerLogin.png",
        "/bannerLogin.png",
        "/bannerLogin.png",
        "/bannerLogin.png",
        "/bannerLogin.png",
        "/bannerLogin.png",
    ];

    const videos = [
        {
            id: "1",
            title: "Video 1",
            thumbnail: "/bannerLogin.png",
            date: "2023-10-01",
            duration: "02:15",
        },
        {
            id: "2",
            title: "Video 2",
            thumbnail: "/bannerLogin.png",
            date: "2023-10-01",
            duration: "02:15",
        },
        {
            id: "3",
            title: "Video 3",
            thumbnail: "/bannerLogin.png",
            date: "2023-10-01",
            duration: "02:15",
        },
        {
            id: "3",
            title: "Video 3",
            thumbnail: "/bannerLogin.png",
            date: "2023-10-01",
            duration: "02:15",
        },
    ];

    const renderMainContent = () => {
        switch (activeTab) {
            case "posts":
                return (
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                setIsOpenComment={setIsOpenComment}
                            />
                        ))}
                    </div>
                );

            case "about":
                return (
                    <Card className="bg-[#1c1a2c] border-gray-700 shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-xl mb-6 text-gray-100">
                                Giới thiệu chi tiết
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-medium mb-3 text-gray-200">
                                        Công việc và học vấn
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-300">
                                            <Briefcase className="h-5 w-5 mr-3 text-gray-400" />
                                            <div>
                                                <p>
                                                    Làm việc tại{" "}
                                                    <strong>Công ty ABC</strong>
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    Từ tháng 1 năm 2022
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <Briefcase className="h-5 w-5 mr-3 text-gray-400" />
                                            <div>
                                                <p>
                                                    Học tại{" "}
                                                    <strong>Đại học XYZ</strong>
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    2018 - 2022
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3 text-gray-200">
                                        Nơi từng sống
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-gray-300">
                                            <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                                            <span>
                                                Sống tại{" "}
                                                <strong>
                                                    Hà Nội, Việt Nam
                                                </strong>
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                                            <span>
                                                Đến từ{" "}
                                                <strong>
                                                    Nam Định, Việt Nam
                                                </strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3 text-gray-200">
                                        Thông tin liên hệ và cơ bản
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-gray-300">
                                            <Heart className="h-5 w-5 mr-3 text-gray-400" />
                                            <span>Độc thân</span>
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                                            <span>
                                                Tham gia Facebook vào tháng 3
                                                năm 2020
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );

            case "friends":
                return (
                    <Card className="bg-[#1c1a2c] border-gray-700 shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-xl mb-6 text-gray-100">
                                Tất cả Người theo dõi
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {friends.map((friend) => (
                                    <div
                                        key={friend.id}
                                        className="text-center p-4 rounded-lg hover:bg-gray-700 cursor-pointer"
                                    >
                                        <div className="relative">
                                            <Avatar className="h-20 w-20 mx-auto mb-3">
                                                <AvatarImage
                                                    src={
                                                        friend.avatar ||
                                                        "/placeholder.svg"
                                                    }
                                                />
                                                <AvatarFallback className="bg-gray-700">
                                                    {friend.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            {friend.isOnline && (
                                                <div className="absolute bottom-2 right-1/2 transform translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1c1a2c]"></div>
                                            )}
                                        </div>
                                        <p className="font-medium text-gray-200">
                                            {friend.name}
                                        </p>
                                        {friend.mutualFriends && (
                                            <p className="text-sm text-gray-400">
                                                {friend.mutualFriends} bạn chung
                                            </p>
                                        )}
                                        <Button
                                            size="sm"
                                            className="mt-2 bg-gray-700 hover:bg-gray-600"
                                        >
                                            Nhắn tin
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                );

            case "photos":
                return (
                    <Card className="bg-[#1c1a2c] border-gray-700 shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-xl mb-6 text-gray-100">
                                Tất cả ảnh
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {photos.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={photo || "/placeholder.svg"}
                                        alt={`Photo ${index + 1}`}
                                        className="aspect-square object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                );

            case "videos":
                return (
                    <Card className="bg-[#1c1a2c] border-gray-700 shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-xl mb-6 text-gray-100">
                                Video
                            </h3>
                            {videos.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {videos.map((video) => (
                                        <div
                                            key={video.id}
                                            className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                        >
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-full h-40 object-cover"
                                            />
                                            <div className="p-4">
                                                <h4 className="text-gray-200 font-medium mb-2">
                                                    {video.title}
                                                </h4>
                                                <p className="text-gray-400 text-sm flex items-center gap-2 justify-between">
                                                    <span>{video.date} </span>
                                                    <div className="flex items-center gap-1">
                                                        <IoIosPlayCircle />
                                                        <span>
                                                            {video.duration}
                                                        </span>
                                                    </div>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Camera className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-400">
                                        Chưa có video nào
                                    </p>
                                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                                        Thêm video đầu tiên
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-800 text-gray-100">
            {/* Cover Photo & Profile Info */}
            <div className="w-full mx-auto">
                <div className="bg-[#1c1a2c]">
                    <div className="relative  h-[40vh] bg-gradient-to-r from-blue-900 to-purple-900 rounded-b-lg overflow-hidden">
                        <img
                            src="/bannerLogin.png"
                            alt="Cover"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <Button
                            variant="secondary"
                            size="sm"
                            className="absolute bottom-4 right-4 bg-gray-800 text-gray-200 hover:bg-gray-700"
                        >
                            <Camera className="h-4 w-4 mr-2" />
                            Chỉnh sửa ảnh bìa
                        </Button>
                    </div>

                    <div className="px-6 pb-4">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20 relative">
                            <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
                                <div className="relative">
                                    <Avatar className="h-40 w-40 border-4 border-[#1c1a2c] shadow-lg">
                                        <AvatarImage src="/placeholder.svg?height=160&width=160" />
                                        <AvatarFallback className="text-4xl bg-gray-700">
                                            NT
                                        </AvatarFallback>
                                    </Avatar>
                                    <Button
                                        size="sm"
                                        className="absolute bottom-2 right-2 rounded-full h-8 w-8 p-0 bg-gray-700 hover:bg-gray-600"
                                    >
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="pb-0">
                                    <h1 className="text-3xl font-bold text-gray-100">
                                        Nguyễn Văn Thành
                                    </h1>
                                    <p className="text-gray-300 mt-1">
                                        1.2K Người theo dõi
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="bg-[#1c1a2c] border-gray-700 shadow-lg">
                                    {/* để gì tại đây ??? */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 px-4 ">
                    {/* Left Sidebar */}
                    <div className="space-y-6 hidden lg:block ">
                        {/* Intro Card */}
                        <Card className="bg-[#1c1a2c] border-gray-700 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-gray-100">
                                    Giới thiệu
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center text-gray-300">
                                    <Briefcase className="h-5 w-5 mr-3" />
                                    <span>
                                        Làm việc tại{" "}
                                        <strong>Công ty ABC</strong>
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <MapPin className="h-5 w-5 mr-3" />
                                    <span>
                                        Sống tại{" "}
                                        <strong>Hà Nội, Việt Nam</strong>
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <Heart className="h-5 w-5 mr-3" />
                                    <span>Độc thân</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <Calendar className="h-5 w-5 mr-3" />
                                    <span>Tham gia vào tháng 3 năm 2020</span>
                                </div>
                                <Button
                                    variant="secondary"
                                    className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-gray-200"
                                >
                                    Xem chi tiết
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Photos Card */}
                        <Card className="bg-[#1c1a2c] border-gray-700 shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-gray-100">
                                        Ảnh
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                                    >
                                        Xem tất cả
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-2">
                                    {photos.slice(0, 9).map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo || "/bannerLogin.png"}
                                            alt={`Photo ${index + 1}`}
                                            className="aspect-square object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Friends Card */}
                        <Card className="bg-[#1c1a2c] border-gray-700 shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-gray-100 flex items-center gap-2">
                                        <span> Đang theo dõi </span>
                                        <p className="text-gray-400 text-sm flex items-center gap-2">
                                            <MdPeopleAlt />
                                            <span>1.234</span>
                                        </p>
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                                    >
                                        Xem tất cả
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {friends.slice(0, 6).map((friend) => (
                                        <div
                                            key={friend.id}
                                            className="text-center"
                                        >
                                            <div className="relative">
                                                <Avatar className="h-16 w-16 mx-auto mb-2">
                                                    <AvatarImage
                                                        src={
                                                            friend.avatar ||
                                                            "/placeholder.svg"
                                                        }
                                                    />
                                                    <AvatarFallback className="bg-gray-700">
                                                        {friend.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {friend.isOnline && (
                                                    <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1c1a2c]"></div>
                                                )}
                                            </div>
                                            <p className="text-sm font-medium truncate text-gray-200">
                                                {friend.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content - 2 columns */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Navigation Header */}
                        <Card className="bg-[#1c1a2c] border-gray-700 shadow-lg">
                            <CardContent className="px-4 ">
                                <div className="flex space-x-8 items-center justify-center">
                                    {listItemComponent.map((tab) => (
                                        <button
                                            key={tab.key}
                                            onClick={() =>
                                                setActiveTab(tab.key)
                                            }
                                            className={`py-3 px-1 border-b-2 font-medium text-sm ${
                                                activeTab === tab.key
                                                    ? "border-blue-500 text-blue-400"
                                                    : "border-transparent text-gray-400 hover:text-gray-200"
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Main Content Area */}
                        {renderMainContent()}
                    </div>

                    {/* Right Sidebar */}
                    <div className="hidden lg:block  ">
                        {!isOpenComment ? (
                            <div
                                ref={stickyRef}
                                className="sticky top-5 space-y-6 hidden lg:block"
                            >
                                {/* item right sidebar */}
                                {/* show navigation profile when scoll */}
                                {isSticky ? (
                                    <Card className="bg-[#1c1a2c] border-gray-700 shadow-lg">
                                        <CardHeader>
                                            <CardTitle className="text-gray-100">
                                                Điều hướng
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="px-4 ">
                                            <div className="grid grid-cols-3 gap-4">
                                                {listItemComponent.map(
                                                    (tab) => (
                                                        <button
                                                            key={tab.key}
                                                            onClick={() =>
                                                                setActiveTab(
                                                                    tab.key
                                                                )
                                                            }
                                                            className={`py-1 px-1 font-medium text-sm  ${
                                                                activeTab ===
                                                                tab.key
                                                                    ? "bg-gray-100/10 text-gray-100 rounded-md border border-gray-700"
                                                                    : "border-transparent text-gray-400 hover:text-gray-200"
                                                            }`}
                                                        >
                                                            {tab.label}
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    ""
                                )}
                                {/* Create Post */}
                                <Card className="bg-[#1c1a2c] border-gray-700 shadow-lg sticky top-5">
                                    <CardContent className="px-4 ">
                                        <div className="flex space-x-3">
                                            <div className="flex-1">
                                                <div className="bg-gray-700 rounded-full px-4 py-3 cursor-pointer hover:bg-gray-600 transition-colors">
                                                    <span className="text-gray-300">
                                                        Bạn đang nghĩ gì?
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex-1 text-gray-400 hover:text-gray-100 hover:bg-gray-700/50"
                                            >
                                                <IoMdImages className="text-5xl" />
                                                Hình Ảnh
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex-1 text-gray-400 hover:text-gray-100 hover:bg-gray-700/50"
                                            >
                                                <TiVideo className="text-5xl" />
                                                Video
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                                {/* Quick Actions */}
                                <Card className="bg-[#1c1a2c] border-gray-700 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-gray-100">
                                            Lối tắt
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-gray-300 hover:bg-gray-700"
                                        >
                                            <Bookmark className="h-4 w-4 mr-3" />
                                            Đã lưu
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-gray-300 hover:bg-gray-700"
                                        >
                                            <Clock className="h-4 w-4 mr-3" />
                                            Kỷ niệm
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-gray-300 hover:bg-gray-700"
                                        >
                                            <GamepadIcon className="h-4 w-4 mr-3" />
                                            Trò chơi
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-gray-300 hover:bg-gray-700"
                                        >
                                            <ShoppingBag className="h-4 w-4 mr-3" />
                                            Marketplace
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <div className="sticky top-5">
                                <Comment
                                    isOpenComment={isOpenComment}
                                    setIsOpenComment={setIsOpenComment}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
