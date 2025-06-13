    "use client"

import { useState } from "react"
import { Search, Settings, Plus, Users, Compass, BookOpen, ChevronRight } from "lucide-react"

interface Group {
  id: string
  name: string
  image: string
  lastPostTime: string
}

const mockGroups: Group[] = [
  {
    id: "1",
    name: "Lập trình ReactLập trình ReactLập trình React",
    image: "/placeholder.svg?height=40&width=40",
    lastPostTime: "2 giờ trước",
  },
  {
    id: "2",
    name: "Thiết kế UI/UX",
    image: "/placeholder.svg?height=40&width=40",
    lastPostTime: "5 giờ trước",
  },
  {
    id: "3",
    name: "JavaScript Việt Nam",
    image: "/placeholder.svg?height=40&width=40",
    lastPostTime: "1 ngày trước",
  },
  {
    id: "4",
    name: "Frontend Developers",
    image: "/placeholder.svg?height=40&width=40",
    lastPostTime: "2 ngày trước",
  },
  {
    id: "5",
    name: "Web Development",
    image: "/placeholder.svg?height=40&width=40",
    lastPostTime: "3 ngày trước",
  },
  {
    id: "6",
    name: "Web Development",
    image: "/placeholder.svg?height=40&width=40",
    lastPostTime: "3 ngày trước",
  },
  {
    id: "7",
    name: "Web Development",
    image: "/placeholder.svg?height=40&width=40",
    lastPostTime: "3 ngày trước",
  },
]

const menuItems = [
  { icon: BookOpen, label: "Nội dung cho bạn", active: true },
  { icon: Compass, label: "Khám phá", active: false },
  { icon: Users, label: "Nhóm của bạn", active: false },
]

export default function CommunitySidebar() {
  const [searchValue, setSearchValue] = useState("")
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null)

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col border-r border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">Cộng đồng</h1>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 group">
          <Settings
            size={20}
            className="text-gray-400 group-hover:text-white group-hover:rotate-90 transition-all duration-300"
          />
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm cộng đồng..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              item.active ? "bg-blue-600 text-white shadow-lg" : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <item.icon
              size={20}
              className={`transition-transform duration-200 ${item.active ? "scale-110" : "group-hover:scale-105"}`}
            />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}

        {/* Create Community Button */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-green-600 hover:text-white transition-all duration-200 group border border-gray-700 hover:border-green-500 mt-2">
          <Plus size={20} className="transition-transform duration-200 group-hover:rotate-90" />
          <span className="font-medium">Tạo cộng đồng</span>
        </button>
      </div>

      {/* Divider */}
      <div className="mx-4 my-4 border-t border-gray-700"></div>

      {/* Joined Groups Section */}
      <div className="flex-1 overflow-hidden h-full  pb-10">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-lg font-semibold text-white">Nhóm đã tham gia</h2>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors duration-200 group">
            Xem tất cả
            <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Groups List */}
        <div className="px-4 space-y-2 scroll-container overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {mockGroups.map((group) => (
            <div
              key={group.id}
              onMouseEnter={() => setHoveredGroup(group.id)}
              onMouseLeave={() => setHoveredGroup(null)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                hoveredGroup === group.id ? "bg-gray-800 transform scale-[1.02] shadow-lg" : "hover:bg-gray-800/50"
              }`}
            >
              <div className="relative">
                <img
                  src={group.image || "/placeholder.svg"}
                  alt={group.name}
                  className={`w-10 h-10 rounded-full object-cover transition-transform duration-200 ${
                    hoveredGroup === group.id ? "scale-110 ring-2 ring-blue-500" : ""
                  }`}
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 transition-opacity duration-200 ${
                    hoveredGroup === group.id ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium text-white truncate transition-colors duration-200 ${
                    hoveredGroup === group.id ? "text-blue-300" : ""
                  }`}
                >
                  {group.name}
                </h3>
                <p className="text-sm text-gray-400 truncate">bài viết gần nhất {group.lastPostTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="h-4 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
    </div>
  )
}
