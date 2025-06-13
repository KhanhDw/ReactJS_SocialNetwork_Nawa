import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, BookOpen, Globe, Award, Building2 } from "lucide-react"

interface ItemCardProps {
  icon?: React.ReactNode
  url: string
  title: string
  description: string
  level: string
  language: string
  hasCertificate: boolean
  category: string
}

export default function ItemCard({
  icon = <BookOpen className="w-8 h-8 text-blue-600" />,
  url = "https://example.com",
  title = "Khóa học React.js cơ bản",
  description = "Học React.js từ cơ bản đến nâng cao, bao gồm hooks, state management và best practices",
  level = "Trung cấp",
  language = "Tiếng Việt",
  hasCertificate = true,
  category = "Công nghệ",
}: ItemCardProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "cơ bản":
        return "bg-green-900 text-green-300 border-green-700"
      case "trung cấp":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      case "nâng cao":
        return "bg-red-900 text-red-300 border-red-700"
      default:
        return "bg-gray-700 text-gray-300 border-gray-600"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "công nghệ":
        return "bg-blue-900 text-blue-300 border-blue-700"
      case "marketing":
        return "bg-purple-900 text-purple-300 border-purple-700"
      case "thiết kế":
        return "bg-pink-900 text-pink-300 border-pink-700"
      case "kinh doanh":
        return "bg-orange-900 text-orange-300 border-orange-700"
      default:
        return "bg-gray-700 text-gray-300 border-gray-600"
    }
  }

  return (
    <Card className="w-full max-w-4xl hover:shadow-lg transition-shadow duration-200 bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex gap-6">
          {/* Cột 1: Icon - 20% width */}
          <div className="w-1/5 flex-shrink-0 flex items-start justify-center pt-2">
            <div className="p-4 bg-gray-700 rounded-lg">{icon}</div>
          </div>

          {/* Cột 2: Thông tin - 80% width */}
          <div className="flex-1 space-y-4">
            {/* URL và Title */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-gray-500" />
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
                >
                  {title}
                </a>
              </div>
            </div>

            {/* Mô tả */}
            <p className="text-gray-300 leading-relaxed">{description}</p>

            {/* Thông tin chi tiết */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cấp độ */}
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-400">Cấp độ:</span>
                <Badge className={getLevelColor(level)}>{level}</Badge>
              </div>

              {/* Ngôn ngữ */}
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-400">Ngôn ngữ:</span>
                <span className="text-sm font-medium text-gray-200">{language}</span>
              </div>

              {/* Chứng chỉ */}
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-400">Chứng chỉ:</span>
                <Badge
                  variant={hasCertificate ? "default" : "secondary"}
                  className={
                    hasCertificate
                      ? "bg-green-900 text-green-300 border-green-700"
                      : "bg-gray-700 text-gray-300 border-gray-600"
                  }
                >
                  {hasCertificate ? "Có" : "Không"}
                </Badge>
              </div>

              {/* Chuyên ngành */}
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-400">Chuyên ngành:</span>
                <Badge className={getCategoryColor(category)}>{category}</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
