import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaThumbsUp,
    FaHeart,
    FaSmile,
    FaSurprise,
    FaSadCry,
    FaAngry,
} from "react-icons/fa";

// Định nghĩa kiểu dữ liệu cho một reaction
interface Reaction {
    name: string;
    icon: React.ReactNode;
    color: string;
}

const reactions: Reaction[] = [
    { name: "Like", icon: <FaThumbsUp />, color: "text-blue-100" },
    { name: "Love", icon: <FaHeart />, color: "text-red-500" },
    { name: "Haha", icon: <FaSmile />, color: "text-yellow-500" },
    { name: "Wow", icon: <FaSurprise />, color: "text-orange-500" },
    { name: "Sad", icon: <FaSadCry />, color: "text-blue-500" },
    { name: "Angry", icon: <FaAngry />, color: "text-red-600" },
];

const ReactionButton: React.FC = () => {
    const [showReactions, setShowReactions] = useState<boolean>(false);
    const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(
        null
    );

    const handleReactionClick = (reaction: Reaction) => {
        setSelectedReaction(reaction);
        setShowReactions(false);
    };

    const handleOutsideClick = () => {
        if (!selectedReaction) {
            setSelectedReaction(
                reactions.find((reaction) => reaction.name === "Like") || null
            );
        }
    };
    const handleOutsideDoubleClick = () => {
        if (selectedReaction) {
            setSelectedReaction(null);
        }
    };

    return (
        <div
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
            className="relative inline-block"
        >
            {/* Nút chính */}
            <motion.button
                onClick={handleOutsideClick}
                onDoubleClick={handleOutsideDoubleClick}
                className={`flex items-center gap-2 px-4 py-2 z-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-700 
                   text-sm font-medium ${
                       selectedReaction
                           ? selectedReaction.color
                           : "text-gray-500"
                   } 
                   ${
                       showReactions
                           ? "bg-gradient-to-r from-gray-700 to-purple-800  transition-colors "
                           : ""
                   }
                   
                   duration-300 shadow-sm hover:shadow-md focus:outline-none select-none`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {selectedReaction ? (
                    <>
                        {/* <span className="text-xs">14043</span> */}
                        <div className="flex items-center gap-1">
                            <span className="text-lg">
                                {selectedReaction.icon}
                            </span>
                            <span>{selectedReaction.name}</span>
                        </div>
                    </>
                ) : (
                    <>
                        {/* <span className="text-xs">10543</span> */}
                        <div className="flex items-center gap-1">
                            <span className="text-lg">
                                <FaThumbsUp />
                            </span>
                        </div>
                    </>
                )}
            </motion.button>

            {/* Khung chứa reactions */}
            <AnimatePresence>
                {showReactions && (
                    <div className="absolute bottom-full mb-1 left-5/6 -translate-x-1/2 z-10">
                        {/* Khung reactions */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="bg-gray-900 p-2 rounded-md shadow-xl flex flex-col-reverse gap-2 border border-gray-500 
                         bg-gradient-to-r from-gray-700 to-gray-800"
                        >
                            {reactions.map((reaction) => (
                                <motion.div
                                    key={reaction.name}
                                    className={`p-2 rounded-full cursor-pointer ${reaction.color} 
                             hover:bg-gray-100/20 transition-all duration-200`}
                                    onClick={() =>
                                        handleReactionClick(reaction)
                                    }
                                    title={reaction.name}
                                    whileHover={{ scale: 1.3, rotate: 10 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <span className="text-xl">
                                        {reaction.icon}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ReactionButton;
