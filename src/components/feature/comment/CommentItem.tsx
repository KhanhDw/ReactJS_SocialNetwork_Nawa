// CommentItem.tsx
import React from "react";
import { FaThumbsUp } from "react-icons/fa";

// Định nghĩa interface cho Comment để kiểm tra kiểu dữ liệu
interface Comment {
    id: number;
    avatar: string;
    username: string;
    content: string;
    timestamp: string; // Hoặc Date nếu bạn muốn truyền đối tượng Date
}

// Định nghĩa interface cho props của CommentItem
interface CommentItemProps {
    comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    const { avatar, username, content, timestamp } = comment;
    const [isLiked, setIsLiked] = React.useState<boolean>(false);

    // Xử lý khi click vào nút like của bình luận
    const handleLikeClick = () => {
        setIsLiked((prev) => !prev);
    };

    // Hàm để định dạng thời gian
    const formatTime = (time: string): string => {
        // Định rõ kiểu đầu vào và đầu ra
        const now = new Date();
        const commentTime = new Date(time);
        const diffInSeconds = Math.floor(
            (now.getTime() - commentTime.getTime()) / 1000
        );

        if (diffInSeconds < 60) {
            return `${diffInSeconds} giây trước`;
        } else if (diffInSeconds < 3600) {
            return `${Math.floor(diffInSeconds / 60)} phút trước`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
        } else if (diffInSeconds < 604800) {
            // 7 ngày
            return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
        } else {
            return commentTime.toLocaleDateString("vi-VN");
        }
    };

    return (
        <div className="flex items-start space-x-2 py-2">
            {/* Avatar */}
            <div className="flex-shrink-0">
                <img
                    className="w-9 h-9 rounded-full object-cover "
                    src={avatar || "https://via.placeholder.com/40"} // Fallback avatar
                    alt={`${username}'s avatar`}
                />
            </div>

            {/* Comment Content */}
            <div className="flex-1 min-w-0">
                <div className="bg-gray-600 rounded-sm px-3 py-2 text-sm max-w-full break-words">
                    <div className="flex items-center ">
                        <div className="font-semibold text-gray-300">
                            {username}
                        </div>
                        {/* Menu tùy chọn - chỉ là placeholder */}
                        <span className="ml-auto cursor-pointer hover:bg-gray-300 transition-all duration-300 ease-in-out hover:text-gray-300 p-1 rounded-full w-5 h-5 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 text-black "
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </span>
                    </div>
                    <p className="text-gray-300">{content}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500 ml-2">
                    <button
                        onClick={handleLikeClick}
                        className="flex items-center gap-1"
                    >
                        {
                            isLiked ? (
                                <FaThumbsUp
                                    className={`text-blue-400 hover:text-blue-500 transition-colors duration-200`}
                                />
                            ) : (
                                  <span className="font-medium cursor-pointer hover:underline select-none">
                                    Thích
                                </span>
                            )
                        }

                    </button>
                    <span className="font-medium cursor-pointer hover:underline select-none">
                        Trả lời
                    </span>
                    <span>{formatTime(timestamp)}</span>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
