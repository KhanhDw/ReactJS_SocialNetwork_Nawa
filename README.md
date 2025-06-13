# React + TypeScript + Vite + TailwindCSS + shadcn/ui

npx shadcn@latest add button input label 

debug bằng terminal command: react-devtools 

chuyên nghiệp hơn viết test giao diện: Storybook component

#  Global UI Components

header
footer
ErrorBoundary : Component bao bọc để hiển thị lỗi thân thiện khi có lỗi trong cây component con.
Pagination : shadcn/ui Pagination
ToastNotification : shadcn/ui Toast
LoadingSpinner.tsx / SkeletonLoader.tsx : Hiển thị khi dữ liệu đang tải.

# Feature-Specific Components
components/feature/PostCard.tsx
components/feature/PostDetail.tsx
components/feature/CommentSection.tsx
components/feature/CommentItem.tsx

components/feature/PostEditor.tsx
components/feature/DashboardPostList.tsx
components/feature/UserProfileHeader.tsx
components/feature/UserProfileTabs.tsx
components/feature/UserProfileEditor.tsx

#  Hiệu suất
Code Splitting : Sử dụng React.lazy() và Suspense
Memoization : Sử dụng React.memo()
Virtualization : react-virtualized để chỉ render các item hiển thị trên màn hình
Image Optimization : loading="lazy" và dùng định dạng WebP 

# admin
admin/components/AdminSidebar.tsx
    Navigation Links cho các khu vực quản lý:
        Dashboard (Tổng quan)
        Bài viết (Posts)
            admin/pages/AdminPostsPage.tsx
                admin/components/tables/PostsTable.tsx
            admin/pages/AdminPostFormPage.tsx
                admin/components/forms/PostForm.tsx
        Người dùng (Users)
            admin/pages/AdminUsersPage.tsx
                admin/components/tables/UsersTable.tsx
        Bình luận (Comments)
            admin/pages/AdminCommentsPage.tsx
                admin/components/tables/CommentsTable.tsx
        Danh mục/Tags (Categories/Tags)
        Cài đặt (Settings)
    User Profile Link (Admin Name/Avatar)
    Logout Button
admin/pages/AdminDashboardPage.tsx
admin/components/widgets/StatsCard.tsx
    Hiển thị các chỉ số quan trọng (shadcn/ui Card).
    Ví dụ: "Tổng số bài viết", "Tổng số người dùng", "Bình luận mới", "Lượt xem hôm nay".
admin/components/widgets/RecentActivities.tsx
    Danh sách các hoạt động gần đây (bài viết mới, bình luận mới, người dùng mới đăng ký).