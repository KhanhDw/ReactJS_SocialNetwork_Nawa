"use client"

import type React from "react"
import { useState, useMemo } from "react"
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Globe,
  FileText,
  Video,
  BookOpen,
  Languages,
  Star,
  Users,
  TrendingUp,
  RotateCcw,
  Check,
  Award,
  Code,
  Megaphone,
  DollarSign,
  PenTool,
  Database,
  TestTube,
  BarChart3,
  Mail,
  Camera,
  Palette,
  SearchIcon,
  MessageSquare,
  ShoppingCart,
  Settings,
  UserCheck,
  Briefcase,
} from "lucide-react"

interface FilterCategory {
  id: string
  name: string
  icon: React.ReactNode
  type: "single" | "multiple" | "range"
  options: FilterOption[]
  color: string
}

interface FilterOption {
  id: string
  name: string
  count: number
  icon?: React.ReactNode
  color?: string
  trending?: boolean
  new?: boolean
}

// Chuyên ngành theo nội dung
const fieldsByContentType: Record<string, FilterOption[]> = {
  "trang-web": [
    { id: "code", name: "Code", count: 1247, icon: <Code className="w-4 h-4" />, trending: true },
    { id: "marketing", name: "Marketing", count: 856, icon: <Megaphone className="w-4 h-4" /> },
    { id: "sales", name: "Sales", count: 432, icon: <DollarSign className="w-4 h-4" /> },
    { id: "content", name: "Content", count: 321, icon: <PenTool className="w-4 h-4" />, new: true },
    { id: "design", name: "Design", count: 287, icon: <Palette className="w-4 h-4" /> },
    { id: "business", name: "Business", count: 198, icon: <Briefcase className="w-4 h-4" /> },
  ],
  "bai-viet": [
    { id: "marketing", name: "Marketing", count: 1234, icon: <Megaphone className="w-4 h-4" />, trending: true },
    { id: "content", name: "Content", count: 987, icon: <PenTool className="w-4 h-4" /> },
    { id: "business", name: "Business", count: 654, icon: <Briefcase className="w-4 h-4" /> },
    { id: "code", name: "Code", count: 432, icon: <Code className="w-4 h-4" /> },
    { id: "sales", name: "Sales", count: 321, icon: <DollarSign className="w-4 h-4" /> },
    { id: "design", name: "Design", count: 234, icon: <Palette className="w-4 h-4" />, new: true },
  ],
  video: [
    { id: "code", name: "Code", count: 432, icon: <Code className="w-4 h-4" />, trending: true },
    { id: "marketing", name: "Marketing", count: 234, icon: <Megaphone className="w-4 h-4" /> },
    { id: "content", name: "Content", count: 198, icon: <PenTool className="w-4 h-4" /> },
    { id: "design", name: "Design", count: 156, icon: <Palette className="w-4 h-4" />, new: true },
    { id: "business", name: "Business", count: 123, icon: <Briefcase className="w-4 h-4" /> },
    { id: "sales", name: "Sales", count: 89, icon: <DollarSign className="w-4 h-4" /> },
  ],
}

// Chuyên môn theo chuyên ngành
const specializationsByField: Record<string, FilterOption[]> = {
  code: [
    { id: "ba", name: "Business Analyst", count: 234, icon: <BarChart3 className="w-4 h-4" />, trending: true },
    { id: "developer", name: "Developer", count: 567, icon: <Code className="w-4 h-4" /> },
    { id: "tester", name: "Tester", count: 189, icon: <TestTube className="w-4 h-4" /> },
    { id: "devops", name: "DevOps", count: 145, icon: <Settings className="w-4 h-4" />, new: true },
    { id: "architect", name: "Solution Architect", count: 98, icon: <Database className="w-4 h-4" /> },
    { id: "pm", name: "Project Manager", count: 123, icon: <UserCheck className="w-4 h-4" /> },
  ],
  marketing: [
    { id: "seo", name: "SEO Specialist", count: 345, icon: <SearchIcon className="w-4 h-4" />, trending: true },
    { id: "social-media", name: "Social Media", count: 289, icon: <MessageSquare className="w-4 h-4" /> },
    { id: "email-marketing", name: "Email Marketing", count: 234, icon: <Mail className="w-4 h-4" /> },
    { id: "content-marketing", name: "Content Marketing", count: 198, icon: <PenTool className="w-4 h-4" /> },
    { id: "ppc", name: "PPC Advertising", count: 167, icon: <DollarSign className="w-4 h-4" />, new: true },
    { id: "analytics", name: "Marketing Analytics", count: 145, icon: <BarChart3 className="w-4 h-4" /> },
  ],
  sales: [
    { id: "b2b-sales", name: "B2B Sales", count: 234, icon: <Briefcase className="w-4 h-4" />, trending: true },
    { id: "b2c-sales", name: "B2C Sales", count: 189, icon: <ShoppingCart className="w-4 h-4" /> },
    { id: "crm", name: "CRM Management", count: 156, icon: <Database className="w-4 h-4" /> },
    { id: "lead-gen", name: "Lead Generation", count: 123, icon: <Users className="w-4 h-4" /> },
    { id: "sales-ops", name: "Sales Operations", count: 98, icon: <Settings className="w-4 h-4" />, new: true },
    { id: "account-mgmt", name: "Account Management", count: 87, icon: <UserCheck className="w-4 h-4" /> },
  ],
  content: [
    { id: "copywriting", name: "Copywriting", count: 298, icon: <PenTool className="w-4 h-4" />, trending: true },
    { id: "video-production", name: "Video Production", count: 234, icon: <Video className="w-4 h-4" /> },
    { id: "graphic-design", name: "Graphic Design", count: 189, icon: <Palette className="w-4 h-4" /> },
    { id: "photography", name: "Photography", count: 156, icon: <Camera className="w-4 h-4" /> },
    {
      id: "content-strategy",
      name: "Content Strategy",
      count: 123,
      icon: <BarChart3 className="w-4 h-4" />,
      new: true,
    },
    { id: "editing", name: "Content Editing", count: 98, icon: <FileText className="w-4 h-4" /> },
  ],
  design: [
    { id: "ui-ux", name: "UI/UX Design", count: 345, icon: <Palette className="w-4 h-4" />, trending: true },
    { id: "web-design", name: "Web Design", count: 234, icon: <Globe className="w-4 h-4" /> },
    { id: "brand-design", name: "Brand Design", count: 189, icon: <Star className="w-4 h-4" /> },
    { id: "motion-graphics", name: "Motion Graphics", count: 156, icon: <Video className="w-4 h-4" />, new: true },
    { id: "print-design", name: "Print Design", count: 123, icon: <FileText className="w-4 h-4" /> },
    { id: "illustration", name: "Illustration", count: 98, icon: <PenTool className="w-4 h-4" /> },
  ],
  business: [
    { id: "strategy", name: "Business Strategy", count: 234, icon: <BarChart3 className="w-4 h-4" />, trending: true },
    { id: "operations", name: "Operations", count: 189, icon: <Settings className="w-4 h-4" /> },
    { id: "finance", name: "Finance", count: 156, icon: <DollarSign className="w-4 h-4" /> },
    { id: "hr", name: "Human Resources", count: 123, icon: <Users className="w-4 h-4" /> },
    { id: "consulting", name: "Consulting", count: 98, icon: <UserCheck className="w-4 h-4" />, new: true },
    { id: "entrepreneurship", name: "Entrepreneurship", count: 87, icon: <TrendingUp className="w-4 h-4" /> },
  ],
}

const filterCategories: FilterCategory[] = [
  {
    id: "content-type",
    name: "Nội dung",
    icon: <Globe className="w-4 h-4" />,
    type: "single",
    color: "blue",
    options: [
      { id: "trang-web", name: "Trang web", count: 1247, icon: <Globe className="w-4 h-4" />, trending: true },
      { id: "bai-viet", name: "Bài viết", count: 2341, icon: <FileText className="w-4 h-4" /> },
      { id: "video", name: "Video", count: 567, icon: <Video className="w-4 h-4" />, trending: true },
    ],
  },
  {
    id: "level",
    name: "Cấp độ",
    icon: <Star className="w-4 h-4" />,
    type: "single",
    color: "green",
    options: [
      { id: "beginner", name: "Người mới bắt đầu", count: 1234 },
      { id: "intermediate", name: "Trung cấp", count: 987 },
      { id: "advanced", name: "Nâng cao", count: 456 },
      { id: "expert", name: "Chuyên gia", count: 123 },
    ],
  },
  {
    id: "language",
    name: "Ngôn ngữ",
    icon: <Languages className="w-4 h-4" />,
    type: "multiple",
    color: "orange",
    options: [
      { id: "vietnamese", name: "Tiếng Việt", count: 1876 },
      { id: "english", name: "English", count: 1432 },
      { id: "chinese", name: "中文", count: 234 },
      { id: "japanese", name: "日本語", count: 156 },
    ],
  },
  {
    id: "certificate",
    name: "Cấp chứng chỉ",
    icon: <Award className="w-4 h-4" />,
    type: "single",
    color: "purple",
    options: [
      { id: "none", name: "Không cấp chứng chỉ", count: 2341 },
      { id: "completion", name: "Chứng chỉ hoàn thành", count: 1234 },
      { id: "professional", name: "Chứng chỉ chuyên nghiệp", count: 567, new: true },
      { id: "accredited", name: "Chứng chỉ được công nhận", count: 234, trending: true },
    ],
  },
]

const colorMap = {
  blue: "from-blue-500/20 to-blue-600/20 border-blue-400/30 text-blue-300",
  purple: "from-purple-500/20 to-purple-600/20 border-purple-400/30 text-purple-300",
  green: "from-green-500/20 to-green-600/20 border-green-400/30 text-green-300",
  orange: "from-orange-500/20 to-orange-600/20 border-orange-400/30 text-orange-300",
  indigo: "from-indigo-500/20 to-indigo-600/20 border-indigo-400/30 text-indigo-300",
  emerald: "from-emerald-500/20 to-emerald-600/20 border-emerald-400/30 text-emerald-300",
  yellow: "from-yellow-500/20 to-yellow-600/20 border-yellow-400/30 text-yellow-300",
}

export default function AdvancedFilterSidebar() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["content-type"]))

  const totalSelectedCount = useMemo(() => {
    return Object.values(selectedFilters).reduce((sum, filters) => sum + filters.length, 0)
  }, [selectedFilters])

  const selectedContentType = selectedFilters["content-type"]?.[0]
  const selectedField = selectedFilters["field"]?.[0]

  const fieldOptions = useMemo(() => {
    if (!selectedContentType) return []
    return fieldsByContentType[selectedContentType] || []
  }, [selectedContentType])

  const specializationOptions = useMemo(() => {
    if (!selectedField) return []
    return specializationsByField[selectedField] || []
  }, [selectedField])

  const dynamicFilterCategories = useMemo(() => {
    const categories = [...filterCategories]

    // Add field category after content-type
    const fieldCategory = {
      id: "field",
      name: "Chuyên ngành",
      icon: <Briefcase className="w-4 h-4" />,
      type: "single" as const,
      color: "indigo",
      options: fieldOptions,
    }

    // Add specialization category after field
    const specializationCategory = {
      id: "specialization",
      name: "Chuyên môn",
      icon: <BookOpen className="w-4 h-4" />,
      type: "multiple" as const,
      color: "emerald",
      options: specializationOptions,
    }

    // Insert categories at appropriate positions
    categories.splice(1, 0, fieldCategory)
    categories.splice(2, 0, specializationCategory)
    return categories
  }, [fieldOptions, specializationOptions])

  const handleFilterChange = (categoryId: string, optionId: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      const category = dynamicFilterCategories.find((c) => c.id === categoryId)
      const newFilters = { ...prev }

      if (!newFilters[categoryId]) {
        newFilters[categoryId] = []
      }

      if (category?.type === "single") {
        newFilters[categoryId] = checked ? [optionId] : []
      } else {
        if (checked) {
          newFilters[categoryId] = [...newFilters[categoryId], optionId]
        } else {
          newFilters[categoryId] = newFilters[categoryId].filter((id) => id !== optionId)
        }
      }

      if (newFilters[categoryId].length === 0) {
        delete newFilters[categoryId]
      }

      // Clear dependent filters when parent changes
      if (categoryId === "content-type") {
        delete newFilters["field"]
        delete newFilters["specialization"]
      } else if (categoryId === "field") {
        delete newFilters["specialization"]
      }

      return newFilters
    })
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  const removeFilter = (categoryId: string, optionId: string) => {
    handleFilterChange(categoryId, optionId, false)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 bg-gray-900 border-r border-gray-700/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30">
                <Filter className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Bộ lọc thông minh</h2>
                <p className="text-xs text-gray-400">
                  {totalSelectedCount > 0 ? `${totalSelectedCount} bộ lọc đang hoạt động` : "Chưa áp dụng bộ lọc nào"}
                </p>
              </div>
            </div>
            {totalSelectedCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 group"
                title="Xóa tất cả bộ lọc"
              >
                <RotateCcw className="w-4 h-4 text-gray-400 group-hover:text-white" />
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bộ lọc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>

        {/* Active Filters */}
        {totalSelectedCount > 0 && (
          <div className="p-2 border-b border-gray-700/50 overflow-auto">
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-300">Bộ lọc đang áp dụng</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedFilters).map(([categoryId, optionIds]) =>
                optionIds.map((optionId) => {
                  const category = dynamicFilterCategories.find((c) => c.id === categoryId)
                  const option = category?.options.find((o) => o.id === optionId)
                  if (!category || !option) return null

                  return (
                    <div
                      key={`${categoryId}-${optionId}`}
                      className={`flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${colorMap[category.color as keyof typeof colorMap]} rounded-full text-xs font-medium border`}
                    >
                      <span>{option.name}</span>
                      <button
                        onClick={() => removeFilter(categoryId, optionId)}
                        className="hover:bg-white/10 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )
                }),
              )}
            </div>
          </div>
        )}

        {/* Filter Categories */}
        <div className="flex-1 overflow-y-auto scroll-container">
          <div className="p-4 space-y-4">
            {dynamicFilterCategories.map((category) => {
              const isExpanded = expandedCategories.has(category.id)
              const selectedCount = selectedFilters[category.id]?.length || 0

              // Special handling for dependent categories
              if (category.id === "field" && !selectedContentType) {
                return (
                  <div key={category.id} className="bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="p-4 flex items-center justify-center">
                      <div className="text-center">
                        <div className="p-3 bg-gray-700/50 rounded-lg mb-3 mx-auto w-fit">
                          <Briefcase className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-gray-400 text-sm">Vui lòng chọn nội dung trước</p>
                        <p className="text-gray-500 text-xs mt-1">để xem các chuyên ngành có sẵn</p>
                      </div>
                    </div>
                  </div>
                )
              }

              if (category.id === "specialization" && !selectedField) {
                return (
                  <div key={category.id} className="bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="p-4 flex items-center justify-center">
                      <div className="text-center">
                        <div className="p-3 bg-gray-700/50 rounded-lg mb-3 mx-auto w-fit">
                          <BookOpen className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-gray-400 text-sm">Vui lòng chọn chuyên ngành trước</p>
                        <p className="text-gray-500 text-xs mt-1">để xem các chuyên môn có sẵn</p>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <div key={category.id} className="bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 bg-gradient-to-r ${colorMap[category.color as keyof typeof colorMap]} rounded-lg border`}
                      >
                        {category.icon}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{category.name}</span>
                          {selectedCount > 0 && (
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-400/30">
                              {selectedCount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">
                          {category.options.length} {category.options.length === 1 ? "tùy chọn" : "tùy chọn"}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-2">
                      {category.options
                        .filter(
                          (option) => searchTerm === "" || option.name.toLowerCase().includes(searchTerm.toLowerCase()),
                        )
                        .map((option) => {
                          const isSelected = selectedFilters[category.id]?.includes(option.id) || false

                          return (
                            <label
                              key={option.id}
                              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-700/30 ${
                                isSelected ? "bg-gray-700/50 border border-gray-600/50" : ""
                              }`}
                            >
                              <input
                                type={category.type === "single" ? "radio" : "checkbox"}
                                name={category.type === "single" ? category.id : undefined}
                                checked={isSelected}
                                onChange={(e) => handleFilterChange(category.id, option.id, e.target.checked)}
                                className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500/50 focus:ring-2"
                              />

                              <div className="flex items-center gap-2 flex-1">
                                {option.icon && (
                                  <div className={`p-1.5 rounded ${option.color || "bg-gray-700"}`}>{option.icon}</div>
                                )}
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-white">{option.name}</span>
                                    {option.trending && (
                                      <span className="px-1.5 py-0.5 bg-orange-500/20 text-orange-300 text-xs rounded border border-orange-400/30">
                                        Hot
                                      </span>
                                    )}
                                    {option.new && (
                                      <span className="px-1.5 py-0.5 bg-green-500/20 text-green-300 text-xs rounded border border-green-400/30">
                                        Mới
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-xs text-gray-400">{option.count.toLocaleString()} mục</span>
                                </div>
                              </div>
                            </label>
                          )
                        })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
