import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Heart,
    MessageCircle,
    UserPlus,
    Calendar,
    Camera,
    Share2,
    MoreHorizontal,
    Settings,
} from "lucide-react";

interface Notification {
    id: string;
    type:
        | "like"
        | "comment"
        | "friend_request"
        | "event"
        | "photo_tag"
        | "share";
    user: {
        name: string;
        avatar: string;
        initials: string;
    };
    content: string;
    time: string;
    isRead: boolean;
    actionText?: string;
}

const initialNotifications: Notification[] = [
    {
        id: "1",
        type: "like",
        user: {
            name: "Nguyễn Văn An",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "NA",
        },
        content: "đã thích bài viết của bạn",
        time: "5 phút trước",
        isRead: false,
    },
    {
        id: "2",
        type: "comment",
        user: {
            name: "Trần Thị Bình",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "TB",
        },
        content: 'đã bình luận về bài viết của bạn: "Bài viết rất hay và bổ ích!"',
        time: "15 phút trước",
        isRead: false,
    },
    {
        id: "3",
        type: "friend_request",
        user: {
            name: "Lê Minh Cường",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "LC",
        },
        content: "đã gửi lời mời kết bạn cho bạn",
        time: "30 phút trước",
        isRead: false,
        actionText: "Chấp nhận",
    },
    {
        id: "4",
        type: "photo_tag",
        user: {
            name: "Phạm Thu Hà",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "PH",
        },
        content: "đã gắn thẻ bạn trong một bức ảnh",
        time: "1 giờ trước",
        isRead: true,
    },
    {
        id: "5",
        type: "event",
        user: {
            name: "Hoàng Đức Minh",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "HM",
        },
        content: 'đã mời bạn tham gia sự kiện "Họp mặt cuối năm 2024"',
        time: "2 giờ trước",
        isRead: true,
        actionText: "Tham gia",
    },
    {
        id: "6",
        type: "share",
        user: {
            name: "Vũ Thị Lan",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "VL",
        },
        content: "đã chia sẻ bài viết của bạn",
        time: "3 giờ trước",
        isRead: true,
    },
    {
        id: "7",
        type: "like",
        user: {
            name: "Đặng Quốc Việt",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "DV",
        },
        content: "và 12 người khác đã thích ảnh của bạn",
        time: "5 giờ trước",
        isRead: true,
    },
    {
        id: "8",
        type: "comment",
        user: {
            name: "Bùi Thị Mai",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "BM",
        },
        content: "đã trả lời bình luận của bạn",
        time: "1 ngày trước",
        isRead: true,
    },
];

const getNotificationIcon = (type: string) => {
    switch (type) {
        case "like":
            return <Heart className="w-4 h-4 text-red-400" />;
        case "comment":
            return <MessageCircle className="w-4 h-4 text-blue-400" />;
        case "friend_request":
            return <UserPlus className="w-4 h-4 text-green-400" />;
        case "event":
            return <Calendar className="w-4 h-4 text-purple-400" />;
        case "photo_tag":
            return <Camera className="w-4 h-4 text-orange-400" />;
        case "share":
            return <Share2 className="w-4 h-4 text-blue-500" />;
        default:
            return null;
    }
};

export default function FacebookNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

    const handleReadAll = () => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) => ({
                ...notification,
                isRead: true,
            }))
        );
    };

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return (
        <Card className="w-full mx-auto shadow-lg bg-gray-900 border-gray-700">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-white">
                        Thông báo
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                            <Badge
                                variant="destructive"
                                className="text-xs border-2 border-gray-500 rounded-full text-white bg-gray-800"
                            >
                                {unreadCount}
                            </Badge>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-300 hover:bg-gray-700"
                        >
                            <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-300 hover:bg-gray-700"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                {unreadCount > 0 && (
                    <Button
                        onClick={handleReadAll}
                        variant="ghost"
                        className="flex w-fit text-blue-400 hover:text-blue-300 hover:bg-transparent p-1 h-auto font-medium text-sm justify-start"
                    >
                        Đánh dấu tất cả là đã đọc
                    </Button>
                )}
            </CardHeader>

            <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`flex items-start gap-3 p-3 hover:bg-gray-800 cursor-pointer transition-colors relative ${
                                !notification.isRead ? "bg-gray-700/10" : ""
                            }`}
                        >
                            {/* Avatar với icon loại thông báo */}
                            <div className="relative flex-shrink-0">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage
                                        src={
                                            notification.user.avatar ||
                                            "/placeholder.svg"
                                        }
                                        alt={notification.user.name}
                                    />
                                    <AvatarFallback className="text-sm font-medium bg-gray-700 text-gray-200">
                                        {notification.user.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 bg-gray-800 rounded-full p-1 shadow-sm border border-gray-600">
                                    {getNotificationIcon(notification.type)}
                                </div>
                            </div>

                            {/* Nội dung thông báo */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-200 leading-relaxed">
                                            <span className="font-semibold">
                                                {notification.user.name}
                                            </span>{" "}
                                            <span className="text-gray-400">
                                                {notification.content}
                                            </span>
                                        </p>
                                        <p className="text-xs text-blue-400 font-medium mt-1">
                                            {notification.time}
                                        </p>

                                        {/* Nút hành động nếu có */}
                                        {notification.actionText && (
                                            <div className="mt-2">
                                                <Button
                                                    size="sm"
                                                    className="h-8 px-4 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700"
                                                    variant={
                                                        notification.type ===
                                                        "friend_request"
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                >
                                                    {notification.actionText}
                                                </Button>
                                                {notification.type ===
                                                    "friend_request" && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="bg-gray-500 h-8 px-4 text-xs font-medium ml-2 text-gray-300 border-gray-600 hover:bg-gray-400"
                                                    >
                                                        Từ chối
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Chấm xanh cho thông báo chưa đọc */}
                            {!notification.isRead && (
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Xem tất cả thông báo */}
                <div className="border-t border-gray-700 p-3">
                    <Button
                        variant="ghost"
                        className="w-full text-blue-400 hover:bg-transparent hover:text-blue-300 font-medium"
                    >
                        Xem tất cả thông báo
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}