import { CheckCheck, ImageIcon, Users, VideoIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { ConversationType } from "@/types";

interface ConversationProps {
  conversation: ConversationType;
}

export const Conversation = ({ conversation }: ConversationProps) => {
  return (
    <>
      <div className="flex gap-2 items-center p-3 hover:bg-chat-hover cursor-pointer">
        <Avatar className="border border-gray-900 overflow-visible relative">
          {conversation.isOnline && (
            <div className="absolute top-0 right-0 z-10 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-foreground"></div>
          )}
          <AvatarImage
            src={conversation.groupImage || "/placeholder.svg"}
            className="object-cover rounded-full"
          />
          <AvatarFallback>
            <div className="animate-pulse bg-gray-tertiary h-full w-full rounded-full"></div>
          </AvatarFallback>
        </Avatar>
        <div className="w-full">
          <div className="flex text-center">
            <h3 className="text-xs lg:text-sm font-bold">
              {conversation.groupName || "Private Chat"}
            </h3>
            <span className="text-[10px] lg:text-xs text-gray-500 ml-auto">
              {formatDate(conversation._creationTime)}
            </span>
          </div>
          <p className="text-[12px] mt-1 text-gray-500 flex items-center gap-1">
            {conversation.lastMessage?.sender === { _id: "user1" }?._id && (
              <CheckCheck className="w-4 h-4" />
            )}
            {conversation.isGroup && <Users size={16} />}
            {!conversation.lastMessage && "Say Hi!"}
            {conversation.lastMessage.messageType === "text" &&
            conversation.lastMessage?.content.length > 30 ? (
              <span className="text-xs">
                {conversation.lastMessage?.content.slice(0, 30)}...
              </span>
            ) : (
              <span className="text-xs">
                {conversation.lastMessage?.content}
              </span>
            )}
            {conversation.lastMessage.messageType === "image" && (
              <ImageIcon size={16} />
            )}
            {conversation.lastMessage.messageType === "video" && (
              <VideoIcon size={16} />
            )}
          </p>
        </div>
      </div>
      <hr className="h-[1px] mx-10 bg-gray-primary" />
    </>
  );
};
