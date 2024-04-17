"use client";

import { VideoIcon, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ChatPlaceholder } from "./chat-placeholder";
import { MessageContainer } from "./message-container";
import { MessageInput } from "./message-input";

export const RightPanel = () => {
  const selectedConversation = true;

  if (!selectedConversation) {
    return <ChatPlaceholder />;
  }

  return (
    <div className="w-3/4 flex flex-col">
      <div className="w-full sticky top-0 z-50">
        <div className="flex justify-between bg-gray-primary p-3">
          <div className="flex gap-3 items-center ml-5">
            <Avatar>
              <AvatarImage src="/placeholder.png" className="object-cover" />
              <AvatarFallback>
                <div className="animate-pulse bg-gray-tertiary w-full h-full rounded-full" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p>John Doe</p>
            </div>
          </div>
          <div className="flex items-center gap-7 mr-5">
            <a href="/video-call" target="_blank">
              <VideoIcon className="w-5 h-5" />
            </a>
            <X className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>
      <MessageContainer />
      <MessageInput />
    </div>
  );
};
