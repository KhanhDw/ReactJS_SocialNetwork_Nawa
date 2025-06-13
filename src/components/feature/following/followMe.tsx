"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import {Button} from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
  isVerified?: boolean; // Keep if you want to show verified badge, removed from current simplified view
  bio?: string; // Removed from current simplified view
  followersCount: number; // Removed from current simplified view
}

export default function FollowMe() {
  const [users,] = useState<User[]>([
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
    // Add more users for testing scroll
    { id: "7", name: "Nguyễn Thu Hà", username: "@nguyenthuha", avatar: "/placeholder.svg?height=40&width=40", isFollowing: true, followersCount: 700 },
    { id: "8", name: "Vũ Đình Khiêm", username: "@vudinhkhiem", avatar: "/placeholder.svg?height=40&width=40", isFollowing: true, isVerified: true, followersCount: 1500 },
    { id: "9", name: "Đặng Ngọc Linh", username: "@dangngoclinh", avatar: "/placeholder.svg?height=40&width=40", isFollowing: true, followersCount: 950 },
    { id: "10", name: "Bùi Thanh Mai", username: "@buithanhmai", avatar: "/placeholder.svg?height=40&width=40", isFollowing: true, followersCount: 620 },
    { id: "11", name: "Trần Quang Nam", username: "@tranquangnam", avatar: "/placeholder.svg?height=40&width=40", isFollowing: true, isVerified: true, followersCount: 2800 },
    { id: "12", name: "Phan Thị Oanh", username: "@phanthioanh", avatar: "/placeholder.svg?height=40&width=40", isFollowing: true, followersCount: 410 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const followingCount = users.filter((user) => user.isFollowing).length;

  return (
    <div className="w-full mx-auto p-4 space-y-6 bg-gray-900 text-white h-[calc(100vh - 64px)]">
      {/* Header - Simpler Title */}
      <div className="text-center space-y-2 mb-6">
        <div className="flex items-center justify-center gap-2">
          <Users className="h-7 w-7 text-blue-400" />
          <h1 className="text-3xl font-extrabold">Theo Dõi Bạn</h1>
        </div>
        <p className="text-gray-400 text-lg">
          {followingCount} người theo dõi bạn  
        </p>
      </div>

      {/* Search Input - Still Sticky */}
      <div className="sticky top-0 z-10 bg-gray-900  border-b border-gray-800 py-4 -mx-4 px-4 rounded-2xl">
        <div className="relative ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 rounded-lg"
          />
        </div>
      </div>

      {/* Users List - Simplified Cards */}
      <div className="space-y-4 pt-2"> {/* Added pt-2 for spacing after sticky search */}
        {filteredUsers.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <p className="text-gray-400">
                {searchTerm
                  ? "Không tìm thấy kết quả phù hợp."
                  : "Chưa có ai trong danh sách."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredUsers.map((user) => (
            <Card
              key={user.id}
              className="bg-gray-800 border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              <div className="px-2 py-1 flex items-center justify-between space-x-3">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback >
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg truncate text-white">
                        {user.name}
                      </h3>
                      {user.isVerified && (
                        <span className="text-blue-400 text-base" title="Đã xác minh">✓</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 truncate">
                      {user.username}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-between px-5">
                <Button variant="outline" className="w-1/3">
                  Theo Dõi Lại
                </Button>
                <Button className="w-fit">
                    Loại Người Theo Dõi
                </Button>
              </div>
            </Card>
          ))
          
        )}
      </div>
    </div>
  );
}