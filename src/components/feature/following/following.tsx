"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { UserMinus, UserPlus, Search, Users } from "lucide-react";

interface User {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isFollowing: boolean;
    isVerified?: boolean;
    bio?: string;
    followersCount: number;
}

export default function Following() {
    const [users, setUsers] = useState<User[]>([
        {
            id: "1",
            name: "Nguyễn Văn An",
            username: "@nguyenvanan",
            avatar: "/placeholder.svg?height=40&width=40",
            isFollowing: true,
            isVerified: true,
            bio: "Frontend Developer | React Enthusiast",
            followersCount: 1250,
        },
        {
            id: "2",
            name: "Trần Thị Bình",
            username: "@tranthibinh",
            avatar: "/placeholder.svg?height=40&width=40",
            isFollowing: true,
            bio: "UI/UX Designer | Creative Mind",
            followersCount: 890,
        },
        {
            id: "3",
            name: "Lê Minh Cường",
            username: "@leminhcuong",
            avatar: "/placeholder.svg?height=40&width=40",
            isFollowing: true,
            isVerified: true,
            bio: "Full-stack Developer | Tech Blogger",
            followersCount: 2100,
        },
        {
            id: "4",
            name: "Phạm Thu Dung",
            username: "@phamthudung",
            avatar: "/placeholder.svg?height=40&width=40",
            isFollowing: true,
            bio: "Product Manager | Startup Enthusiast",
            followersCount: 567,
        },
        {
            id: "5",
            name: "Hoàng Văn Em",
            username: "@hoangvanem",
            avatar: "/placeholder.svg?height=40&width=40",
            isFollowing: true,
            bio: "Data Scientist | AI Researcher",
            followersCount: 1800,
        },
        {
            id: "6",
            name: "Hoàng Văn Em",
            username: "@hoangvanem",
            avatar: "/placeholder.svg?height=40&width=40",
            isFollowing: true,
            bio: "Data Scientist | AI Researcher",
            followersCount: 1800,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState<string | null>(null);

    const handleFollowToggle = async (userId: string) => {
        setLoading(userId);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId
                    ? {
                          ...user,
                          isFollowing: !user.isFollowing,
                          followersCount: user.isFollowing
                              ? user.followersCount - 1
                              : user.followersCount + 1,
                      }
                    : user
            )
        );

        setLoading(null);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const followingCount = users.filter((user) => user.isFollowing).length;

    return (
        <div className="w-full mx-auto p-4 space-y-6 bg-gray-900 min-h-screen ">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                    <Users className="h-6 w-6 text-blue-400" />
                    <h1 className="text-2xl font-bold text-white">
                        Đang theo dõi
                    </h1>
                </div>
                <p className="text-gray-400">
                    Bạn đang theo dõi {followingCount} người
                </p>
            </div>

            {/* Search */}
            <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 py-4">
                <div className="relative ">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Tìm kiếm người đang theo dõi..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                </div>
            </div>
            {/* Users List */}
            <div className="space-y-3">
                {filteredUsers.length === 0 ? (
                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-6 text-center">
                            <p className="text-gray-400">
                                {searchTerm
                                    ? "Không tìm thấy kết quả phù hợp"
                                    : "Chưa có ai trong danh sách"}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    filteredUsers.map((user) => (
                        <Card
                            key={user.id}
                            className="hover:shadow-md transition-shadow bg-gray-800 border-gray-700 cursor-default"
                        >
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3 flex-1">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage
                                                src={
                                                    user.avatar ||
                                                    "/placeholder.svg"
                                                }
                                                alt={user.name}
                                            />
                                            <AvatarFallback>
                                                {user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-sm truncate text-white">
                                                    {user.name}
                                                </h3>
                                                {user.isVerified && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="h-4 px-1 text-xs"
                                                    >
                                                        ✓
                                                    </Badge>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-400 mb-1">
                                                {user.username}
                                            </p>

                                            {user.bio && (
                                                <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                                                    {user.bio}
                                                </p>
                                            )}

                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span className="text-gray-500">
                                                    {user.followersCount.toLocaleString()}{" "}
                                                    người theo dõi
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        variant={
                                            user.isFollowing
                                                ? "outline"
                                                : "default"
                                        }
                                        size="sm"
                                        onClick={() =>
                                            handleFollowToggle(user.id)
                                        }
                                        disabled={loading === user.id}
                                        className={`ml-3 shrink-0 ${
                                            user.isFollowing
                                                ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-red-300 bg-gray-600"
                                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                    >
                                        {loading === user.id ? (
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        ) : user.isFollowing ? (
                                            <>
                                                <UserMinus className="h-4 w-4 mr-1" />
                                                Bỏ theo dõi
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus className="h-4 w-4 mr-1" />
                                                Theo dõi
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Stats */}
            {filteredUsers.length > 0 && (
                <div className="text-center text-sm text-gray-500">
                    Hiển thị {filteredUsers.length} trong tổng số {users.length}{" "}
                    người
                </div>
            )}
        </div>
    );
}
