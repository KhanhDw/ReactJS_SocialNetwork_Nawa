import React, { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import CommentItem from "./CommentItem";
import { Send } from "lucide-react";
// Định nghĩa interface cho Comment
interface Comment {
    id: number;
    avatar: string;
    username: string;
    content: string;
    timestamp: string;
}

// Định nghĩa interface cho props của Comment
interface CommentProps {
    isOpenComment: boolean;
    setIsOpenComment: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component Comment
const Comment: React.FC<CommentProps> = ({
    isOpenComment,
    setIsOpenComment,
}) => {
    const commentRef = useRef<HTMLDivElement>(null);

    // State để quản lý danh sách bình luận
    const [comments, setComments] = useState<Comment[]>([
        // Dữ liệu mẫu, có thể thay bằng API
        {
            id: 1,
            avatar: "https://picsum.photos/300/200",
            username: "NguyenVanA",
            content: "Bài viết rất hay, cảm ơn bạn!",
            timestamp: "2025-06-03T15:30:00Z",
        },
        {
            id: 2,
            avatar: "https://picsum.photos/300/200",
            username: "TranThiB",
            content: "Mình có một câu hỏi, bạn có thể giải thích thêm không?",
            timestamp: "2025-06-03T14:00:00Z",
        },
        {
            id: 3,
            avatar: "https://picsum.photos/300/200",
            username: "TranThiB",
            content: "Mình có một câu hỏi, bạn có thể giải thích thêm không?",
            timestamp: "2025-06-03T14:00:00Z",
        },
        {
            id: 3,
            avatar: "https://picsum.photos/300/200",
            username: "TranThiB",
            content: "Mình có một câu hỏi, bạn có thể giải thích thêm không?",
            timestamp: "2025-06-03T14:00:00Z",
        },
        {
            id: 3,
            avatar: "https://picsum.photos/300/200",
            username: "TranThiB",
            content: "Mình có một câu hỏi, bạn có thể giải thích thêm không?",
            timestamp: "2025-06-03T14:00:00Z",
        },
    ]);

    // State để quản lý nội dung bình luận mới
    const [newComment, setNewComment] = useState("");

    // Hàm xử lý đóng/mở bình luận
    const handleToggleComment = (): void => {
        setIsOpenComment((prev) => !prev);
    };

    // Hàm xử lý thêm bình luận mới
    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now(), // ID tạm thời, thay bằng ID từ API trong thực tế
            avatar: "https://picsum.photos/300/200", // Thay bằng avatar của user
            username: "Người dùng", // Thay bằng thông tin user thực tế
            content: newComment.trim(),
            timestamp: new Date().toISOString(),
        };

        setComments((prev) => [...prev, comment]);
        setNewComment("");
    };

    useEffect(() => {
        // commentRef.current?.scrollIntoView({ behavior: "smooth" });
        if (commentRef.current) {
            commentRef.current.scrollTop = commentRef.current?.scrollHeight; // cuộn đến cuối danh sách bình luận
        }
    }, [comments]);

    return (
        <div
            className={`${
                isOpenComment ? "block" : "hidden"
            } flex flex-col  justify-between bg-[#313d47] p-4 rounded-lg shadow-md max-w-2xl mx-auto transition-all duration-300 max-h-screen h-screen overflow-hidden`}
        >
            {/* Header với tiêu đề và nút đóng */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">
                    Bình luận ({comments.length})
                </h2>
                <button
                    onClick={handleToggleComment}
                    className="p-1 text-white rounded-2xl hover:bg-red-700 transition-colors"
                    aria-label="Đóng bình luận"
                >
                    <IoMdClose size={24} />
                </button>
            </div>

            {/* Danh sách bình luận */}
            <div
                className="pr-1 overflow-hidden h-full "
            >
                <div  ref={commentRef} className="space-y-1 overflow-y-auto h-full [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:bg-gray-700
                        [&::-webkit-scrollbar-thumb]:bg-gray-500
                        hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                            />
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm">
                            Chưa có bình luận nào.
                        </p>
                    )}
                </div>
            </div>

            {/* Form thêm bình luận */}
            <form
                onSubmit={handleAddComment}
                className="relative mt-4"
            >
                <textarea
                    className="w-full p-4 pr-16 rounded-lg border border-transparent bg-gray-600 text-gray-200 focus:outline-none focus:ring-0 focus:ring-gray-300 shadow-sm transition-all resize-none"
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Viết bình luận của bạn..."
                />
                <button
                    type="submit"
                    className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full hover:shadow-md transition-all disabled:opacity-70 disabled:from-blue-400 disabled:to-blue-400 disabled:cursor-not-allowed"
                    disabled={!newComment.trim()}
                    aria-label="Gửi bình luận"
                >
                    <Send
                        size={18}
                        className="text-white"
                    />
                </button>
            </form>
        </div>
    );
};

export default Comment;
