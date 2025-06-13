import { Code, Palette, TrendingUp, Users } from "lucide-react"
import ItemCard from "./item-card"

export default function Demo() {
  const sampleItems = [
    {
      icon: <Code className="w-8 h-8 text-blue-400" />,
      url: "https://reactjs.org",
      title: "Khóa học React.js từ cơ bản đến nâng cao",
      description:
        "Học React.js từ cơ bản đến nâng cao, bao gồm hooks, state management, routing và deployment. Khóa học bao gồm nhiều dự án thực tế.",
      level: "Trung cấp",
      language: "Tiếng Việt",
      hasCertificate: true,
      category: "Công nghệ",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
      url: "https://example.com/marketing",
      title: "Digital Marketing Strategy 2024",
      description:
        "Chiến lược marketing số hiệu quả, bao gồm SEO, SEM, Social Media Marketing và Content Marketing cho doanh nghiệp.",
      level: "Nâng cao",
      language: "Tiếng Anh",
      hasCertificate: false,
      category: "Marketing",
    },
    {
      icon: <Palette className="w-8 h-8 text-pink-400" />,
      url: "https://example.com/design",
      title: "UI/UX Design Fundamentals",
      description:
        "Nguyên lý cơ bản về thiết kế giao diện người dùng và trải nghiệm người dùng, sử dụng Figma và Adobe XD.",
      level: "Cơ bản",
      language: "Tiếng Việt",
      hasCertificate: true,
      category: "Thiết kế",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-400" />,
      url: "https://example.com/business",
      title: "Quản lý dự án Agile & Scrum",
      description: "Phương pháp quản lý dự án Agile và Scrum, phù hợp cho các team phát triển phần mềm và startup.",
      level: "Trung cấp",
      language: "Tiếng Việt",
      hasCertificate: true,
      category: "Kinh doanh",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {sampleItems.map((item, index) => (
          <ItemCard key={index} {...item} />
        ))}
      </div>
    </div>
  )
}
