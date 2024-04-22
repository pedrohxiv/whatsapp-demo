import { useQuery } from "convex/react";
import { CheckCheck } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getRelativeDateTime, isSameDay } from "@/lib/utils";
import { ConversationType } from "@/types";

import { api } from "../../../../convex/_generated/api";

interface MessageContainerProps {
  selectedConversation: ConversationType;
}

export const MessageContainer = ({
  selectedConversation,
}: MessageContainerProps) => {
  const messages = useQuery(api.messages.getMessages, {
    conversation: selectedConversation._id,
  });
  const me = useQuery(api.users.getMe);

  return (
    <div className="relative p-3 flex-1 overflow-auto h-full bg-chat-tile-light dark:bg-chat-tile-dark">
      <div className="mx-12 flex flex-col gap-3 h-full">
        {messages?.map((message, index) => {
          const isMember =
            selectedConversation.participants.includes(message.sender._id) ||
            false;
          const isGroup = selectedConversation.isGroup;

          const previousMessage = messages[index - 1];

          if (message.sender._id !== me?._id) {
            return (
              <>
                {(!previousMessage ||
                  !isSameDay(
                    previousMessage._creationTime,
                    message._creationTime
                  )) && (
                  <div className="flex justify-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 p-1 z-50 rounded-md bg-white dark:bg-gray-primary">
                      {getRelativeDateTime(message, previousMessage)}
                    </p>
                  </div>
                )}
                <div className="flex gap-1 w-2/3">
                  {isGroup && (
                    <Avatar className="overflow-visible relative">
                      {message.sender.isOnline && isMember && (
                        <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2" />
                      )}
                      <AvatarImage
                        src={message.sender.image}
                        className="rounded-full object-cover w-8 h-8"
                      />
                      <AvatarFallback>
                        <div className="animate-pulse bg-gray-tertiary rounded-full" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "flex z-20 max-w-fit px-2 pt-1 rounded-md shadow-md relative",
                      message.sender._id === me?._id
                        ? "bg-green-chat"
                        : "bg-white dark:bg-gray-primary"
                    )}
                  >
                    <div className="absolute bg-white dark:bg-gray-primary top-0 -left-[4px] w-3 h-3 rounded-bl-full" />
                    {/^(ftp|http|https):\/\/[^ "]+$/.test(message.content) ? (
                      <a
                        href={message.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-2 text-sm font-light text-blue-400 underline"
                      >
                        {message.content}
                      </a>
                    ) : (
                      <p className="mr-2 text-sm font-light">
                        {message.content}
                      </p>
                    )}
                    <p className="text-[10px] mt-2 self-end flex gap-1 items-center">
                      {`${new Date(message._creationTime).getHours().toString().padStart(2, "0")}:${new Date(message._creationTime).getHours().toString().padStart(2, "0")}`}{" "}
                      {message.sender._id === me?._id && <CheckCheck />}
                    </p>
                  </div>
                </div>
              </>
            );
          }

          return (
            <>
              {(!previousMessage ||
                !isSameDay(
                  previousMessage._creationTime,
                  message._creationTime
                )) && (
                <div className="flex justify-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 p-1 z-50 rounded-md bg-white dark:bg-gray-primary">
                    {getRelativeDateTime(message, previousMessage)}
                  </p>
                </div>
              )}
              <div className="flex gap-1 ml-auto w-2/3">
                <div
                  className={cn(
                    "flex z-20 max-w-fit px-2 pt-1 rounded-md shadow-md ml-auto relative",
                    message.sender._id === me?._id
                      ? "bg-green-chat"
                      : "bg-white dark:bg-gray-primary"
                  )}
                >
                  <div className="absolute bg-green-chat top-0 -right-[3px] w-3 h-3 rounded-br-full overflow-hidden" />
                  {/^(ftp|http|https):\/\/[^ "]+$/.test(message.content) ? (
                    <a
                      href={message.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-2 text-sm font-light text-blue-400 underline"
                    >
                      {message.content}
                    </a>
                  ) : (
                    <p className="mr-2 text-sm font-light">{message.content}</p>
                  )}
                  <p className="text-[10px] mt-2 self-end flex gap-1 items-center">
                    {`${new Date(message._creationTime).getHours().toString().padStart(2, "0")}:${new Date(message._creationTime).getHours().toString().padStart(2, "0")}`}{" "}
                    {message.sender._id === me?._id && <CheckCheck />}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
