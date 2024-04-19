"use client";

import { VideoIcon, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConversationStore } from "@/store/chat-store";

import { ChatPlaceholder } from "./chat-placeholder";
import { GroupMembersDialog } from "./group-members-dialog";
import { MessageContainer } from "./message-container";
import { MessageInput } from "./message-input";

export const RightPanel = () => {
  const { selectedConversation, setSelectedConversation } =
    useConversationStore();

  if (!selectedConversation) {
    return <ChatPlaceholder />;
  }

  return (
    <div className="w-3/4 flex flex-col">
      <div className="w-full sticky top-0 z-50">
        <div className="flex justify-between bg-gray-primary p-3">
          <div className="flex gap-3 items-center ml-5">
            <Avatar>
              <AvatarImage
                src={
                  selectedConversation.groupImage ||
                  selectedConversation.image ||
                  "/placeholder.png"
                }
                className="object-cover"
              />
              <AvatarFallback>
                <div className="animate-pulse bg-gray-tertiary w-full h-full rounded-full" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p>
                {selectedConversation.groupName || selectedConversation.name}
              </p>
              {selectedConversation.isGroup && (
                <GroupMembersDialog
                  selectedConversation={selectedConversation}
                />
              )}
            </div>
          </div>
          <div className="flex items-center gap-7 mr-5">
            <a href="/video-call" target="_blank">
              <VideoIcon className="w-5 h-5" />
            </a>
            <X
              onClick={() => setSelectedConversation(null)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <MessageContainer />
      <MessageInput />
    </div>
  );
};
