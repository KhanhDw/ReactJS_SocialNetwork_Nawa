"use client";

import type React from "react";
import { useEffect, useRef } from 'react';
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Check, CheckCheck, Clock, File, DotIcon } from "lucide-react";
import  "@/assets/css/scrollbarCustomer.css"; // Assuming you have a CSS file for styles
export interface Message {
    id: string;
    type: "text" | "system" | "image" | "file" | "link" | "gallery";
    content: string;
    sender: {
        id: string;
        name: string;
        avatar?: string;
    };
    timestamp: Date;
    status?: "sending" | "sent" | "delivered" | "read";
    isOwn: boolean;
    attachment?: {
        type: "image" | "file";
        url: string;
        name?: string;
    };
    links?: string[];
    gallery?: {
        images: string[];
        caption?: string;
    };
}

interface ChatBubbleProps {
    message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusIcon = (status?: string) => {
        switch (status) {
            case "sending":
                return <Clock className="w-3 h-3 text-gray-500" />;
            case "sent":
                return <Check className="w-3 h-3 text-gray-500" />;
            case "delivered":
                return <CheckCheck className="w-3 h-3 text-gray-500" />;
            case "read":
                return <CheckCheck className="w-3 h-3 text-blue-400" />;
            default:
                return null;
        }
    };

    const renderLinks = (text: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);

        return parts.map((part, index) => {
            if (urlRegex.test(part)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline break-all"
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    if (message.type === "system") {
        return (
            <div className="flex justify-center my-4">
                <Badge
                    variant="secondary"
                    className="text-xs bg-gray-700 text-gray-300 border-gray-600"
                >
                    {message.content}
                </Badge>
            </div>
        );
    }

    return (
        <div
            className={`flex mb-4 ${
                message.isOwn ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`flex max-w-xs lg:max-w-md ${
                    message.isOwn ? "flex-row-reverse" : "flex-row"
                }`}
            >
                {!message.isOwn && (
                    <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage
                            src={message.sender.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback className="bg-gray-600 text-white">
                            {message.sender.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                )}

                <div
                    className={`flex flex-col ${
                        message.isOwn ? "items-end" : "items-start"
                    }`}
                >
                    {!message.isOwn && (
                        <span className="text-xs text-gray-400 mb-1 px-2">
                            {message.sender.name}
                        </span>
                    )}

                    <div
                        className={`px-4 py-2 rounded-lg ${
                            message.isOwn
                                ? "bg-[#2f3c5a] text-white rounded-br-sm"
                                : "bg-gray-700 text-gray-100 rounded-bl-sm"
                        }`}
                    >
                        {message.type === "image" && message.attachment && (
                            <div className="mb-2">
                                <img
                                    src={
                                        message.attachment.url ||
                                        "/placeholder.svg"
                                    }
                                    alt="Attachment"
                                    className="max-w-full h-auto rounded max-h-64 object-cover"
                                />
                            </div>
                        )}

                        {message.type === "gallery" && message.gallery && (
                            <div className="mb-2">
                                <div className="grid grid-cols-2 gap-1 max-w-xs">
                                    {message.gallery.images
                                        .slice(0, 4)
                                        .map((img, index) => (
                                            <div
                                                key={index}
                                                className="relative"
                                            >
                                                <img
                                                    src={
                                                        img ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={`Gallery ${index + 1}`}
                                                    className="w-full h-20 object-cover rounded"
                                                />
                                                {index === 3 &&
                                                    message.gallery!.images
                                                        .length > 4 && (
                                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                                                            <span className="text-white text-sm font-medium">
                                                                +
                                                                {message.gallery!
                                                                    .images
                                                                    .length - 4}
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>
                                        ))}
                                </div>
                                {message.gallery.caption && (
                                    <p className="text-sm mt-2">
                                        {message.gallery.caption}
                                    </p>
                                )}
                            </div>
                        )}

                        {message.type === "file" && message.attachment && (
                            <div className="flex items-center mb-2 p-2 bg-black bg-opacity-20 rounded">
                                <File className="w-4 h-4 mr-2 cursor-pointer" />
                                <span className="text-sm cursor-pointer">
                                    {message.attachment.name}
                                </span>
                            </div>
                        )}

                        {(message.type === "text" ||
                            message.type === "link") && (
                            <div className="text-sm whitespace-pre-wrap break-words max-w-120">
                                {renderLinks(message.content)}
                            </div>
                        )}
                    </div>

                    <div
                        className={`flex items-center mt-1 text-xs text-gray-500 ${
                            message.isOwn ? "flex-row-reverse" : "flex-row"
                        }`}
                    >
                        <span className="mx-1">
                            {formatTime(message.timestamp)}
                        </span>
                        {message.isOwn && getStatusIcon(message.status)}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ChatProps {
    title?: string;
    messages: Message[];
    onSendMessage?: (content: string) => void;
}

export const Chat: React.FC<ChatProps> = ({
    title = "Chat",
    messages,
    onSendMessage,
}) => {
    const [inputValue, setInputValue] = useState("");
     const bottomRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
        if (inputValue.trim() && onSendMessage) {
            onSendMessage(inputValue.trim());
            setInputValue("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                // Shift+Enter: xuống dòng (default behavior)
                return;
            } else {
                // Enter: gửi tin nhắn
                e.preventDefault();
                handleSend();
            }
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="w-full mx-auto h-screen flex flex-col bg-[#1c1a2c] border-gray-700 overflow-hidden rounded-2xl border ">
            {/* header */}
            <div className="border-b border-gray-700">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <img src="./bannerLogin.png" alt="avatar" className="w-10 h-10 rounded-full" />
                      <h1 className="text-lg text-white font-bold">{title}</h1>
                  </div>
                    <Button
                        onClick={() => setInputValue("")}
                        size="icon"
                        className="bg-gray-700 hover:bg-gray-600 text-white"
                    >
                        <DotIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="scroll-container flex flex-col py-4 bg-[#1c1a2c] justify-between overflow-y-auto my-4">
                <div className="px-4 py-4 h-full">
                    {messages.map((message) => (
                        <ChatBubble
                            key={message.id}
                            message={message}
                        />
                    ))}
                    {/* Đoạn đánh dấu cuối cùng để scroll tới */}
                <div ref={bottomRef} />
                </div>
            </div>
              <div className="border-t border-gray-700 p-2 bg-gray-800">
                  <div className="flex space-x-2">
                      <textarea
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder="Nhập tin nhắn... (Shift+Enter để xuống dòng)"
                          className="flex-1 min-h-[40px] max-h-[120px] resize-none bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={1}
                      />
                      <Button
                          onClick={handleSend}
                          disabled={!inputValue.trim()}
                          size="icon"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                          <Send className="w-4 h-4" />
                      </Button>
                  </div>
              </div>
        </div>
    );
};
