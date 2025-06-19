import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { GrFormView } from "react-icons/gr";
import { BiCommentDots } from "react-icons/bi";
import ReactionButton from "@/components/feature/post-card/ReactionButton";
import { FaCommentDots } from "react-icons/fa";
import { RiShareCircleFill } from "react-icons/ri";
import ImageLightbox from "@/components/feature/post-card/ImageLightbox";
import {
    FaThumbsUp,
    FaHeart,
    FaSmile,
    FaSurprise,
    FaSadCry,
    FaAngry,
} from "react-icons/fa";

interface Post {
    id: string;
    author: {
        name: string;
        group: string;
        avatar: string;
        timestamp: string;
    };
    title: string;
    content: string;
    images?: string[];
    tags: string[];
    reactions: {
        like: number;
        heart: number;
        smile: number;
        surprise: number;
        sad: number;
        angry: number;
    };
    stats: {
        views: number;
        comments: number;
        shares: number;
    };
}

interface PostCardProps {
    post: Post;
    setIsOpenComment: React.Dispatch<React.SetStateAction<boolean>>; //chấp nhận callback khi dùng useState ở cha
}

function PostCard({ post, setIsOpenComment }: PostCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const shouldShowExpandButton = post.content.length > 150;
    const setIsOpenCommentHandleClick = (): void => {
        setIsOpenComment((prev: boolean) => !prev);
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const navigateImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <>
            <div>
                <div className="w-full max-w-full p-4 bg-[#1c1a2c] border border-gray-600 rounded-lg shadow-md text-white mb-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 w-10/12 overflow-hidden">
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src={
                                        post.author.avatar ||
                                        "https://avatars.githubusercontent.com/u/1024101?v=4"
                                    }
                                    alt={post.author.name}
                                />
                                <div className="flex flex-col ">
                                    <p className="text-sm font-bold text-gray-300 line-clamp-1">
                                        {post.author.name}{" "}
                                        <span className="font-thin">
                                            thuộc nhóm{" "}
                                        </span>
                                        <span className="">
                                            {post.author.group}
                                        </span>
                                    </p>
                                    <p className="text-sm font-light text-gray-400">
                                        {post.author.timestamp}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 w-2/12">
                                <button className="text-sm font-bold text-gray-300 hover:text-gray-900 hover:cursor-pointer hover:bg-yellow-500 rounded-sm p-1 duration-300 transition-all ease-in-out">
                                    Theo dõi
                                </button>
                                <button className="text-sm font-light text-gray-500 hover:text-gray-900 hover:cursor-pointer hover:bg-gray-600 rounded-full p-1">
                                    <HiDotsVertical className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-start justify-center flex-col gap-2 cursor-default">
                            <h5 className="text-xl font-bold tracking-tight text-gray-300 line-clamp-1">
                                {post.title}
                            </h5>
                            <h5
                                className={`text-sm font-normal tracking-tight text-gray-400 ${
                                    isExpanded ? "" : "line-clamp-2"
                                }`}
                            >
                                {post.content}
                            </h5>
                            {shouldShowExpandButton && (
                                <button
                                    onClick={toggleExpanded}
                                    className="text-sm text-blue-400 hover:text-blue-300 mt-1 font-medium transition-colors duration-200"
                                >
                                    {isExpanded ? "Thu gọn" : "Xem thêm"}
                                </button>
                            )}
                        </div>
                    </div>
                    {/* Images Section */}
                    {post.images && post.images.length > 0 && (
                        <div className="mt-4 w-full gap-2 h-64 flex items-start justify-start rounded-sm overflow-y-hidden overflow-x-hidden duration-300 transition-all ease-in-out hover:overflow-x-auto hover:pb-2">
                            {post.images.map((image, index) => (
                                <img
                                    key={index}
                                    className="w-fit max-h-60 h-60 rounded-sm object-contain"
                                    src={
                                        image ||
                                        "/placeholder.svg?height=300&width=400"
                                    }
                                    alt={`Post image ${index + 1}`}
                                    onClick={() => openLightbox(index)}
                                />
                            ))}
                        </div>
                    )}
                    <div className="mt-4 flex items-center gap-2 justify-between">
                        <p className="text-sm font-light text-green-300 truncate w-1/3">
                            {post.tags.join(", ")}
                        </p>
                        <div className="flex items-center gap-3 select-none">
                            {post.reactions.like > 0 && (
                                <div className="flex items-center justify-center gap-0.5">
                                    <FaThumbsUp className="text-blue-100" />
                                    <span className="text-xs">
                                        {post.reactions.like}
                                    </span>
                                </div>
                            )}
                            {post.reactions.heart > 0 && (
                                <div className="flex items-center justify-center gap-0.5">
                                    <FaHeart className="text-red-500" />
                                    <span className="text-xs">
                                        {post.reactions.heart}
                                    </span>
                                </div>
                            )}
                            {post.reactions.smile > 0 && (
                                <div className="flex items-center justify-center gap-0.5">
                                    <FaSmile className="text-yellow-500" />
                                    <span className="text-xs">
                                        {post.reactions.smile}
                                    </span>
                                </div>
                            )}
                            {post.reactions.surprise > 0 && (
                                <div className="flex items-center justify-center gap-0.5">
                                    <FaSurprise className="text-orange-500" />
                                    <span className="text-xs">
                                        {post.reactions.surprise}
                                    </span>
                                </div>
                            )}
                            {post.reactions.sad > 0 && (
                                <div className="flex items-center justify-center gap-0.5">
                                    <FaSadCry className="text-blue-500" />
                                    <span className="text-xs">
                                        {post.reactions.sad}
                                    </span>
                                </div>
                            )}
                            {post.reactions.angry > 0 && (
                                <div className="flex items-center justify-center gap-0.5">
                                    <FaAngry className="text-red-600" />
                                    <span className="text-xs">
                                        {post.reactions.angry}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm font-thin text-gray-400 flex items-center gap-2">
                            <GrFormView className="text-2xl" />
                            <span>{post.stats.views}</span>
                            <span>|</span>
                            <FaCommentDots />
                            <span>{post.stats.comments}</span>
                            <span>|</span>
                            <RiShareCircleFill />
                            <span>{post.stats.shares}</span>
                        </p>
                        <div className="flex items-center gap-10">
                            <button className="text-sm flex gap-2 text-gray-300 hover:text-yellow-400">
                                <RiShareCircleFill className="w-6 h-6" />
                                <div className="flex items-center gap-1">
                                    <span className="select-none font-medium">
                                        Chia sẽ
                                    </span>
                                </div>
                            </button>
                            <button
                                onClick={setIsOpenCommentHandleClick}
                                className="text-sm flex gap-2 text-gray-300 hover:text-green-400"
                            >
                                <BiCommentDots className="w-6 h-6" />
                                <div className="flex items-center gap-1">
                                    <span className="select-none font-medium">
                                        Bình luận
                                    </span>
                                </div>
                            </button>
                            <div className="flex items-center ">
                                <div>
                                    <ReactionButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Image Lightbox */}
                <ImageLightbox
                    images={post.images || []}
                    currentIndex={currentImageIndex}
                    isOpen={lightboxOpen}
                    onClose={closeLightbox}
                    onNavigate={navigateImage}
                />
            </div>
        </>
    );
}

export default PostCard;
