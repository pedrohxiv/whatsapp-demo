import { useMutation, useQuery } from "convex/react";
import { Ban, CheckCheck, LogOut } from "lucide-react";
import Image from "next/image";
import { Fragment, useState } from "react";
import ReactPlayer from "react-player";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { cn, getRelativeDateTime, isSameDay } from "@/lib/utils";
import { useConversationStore } from "@/store/chat-store";
import { ConversationType } from "@/types";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type Message = {
  sender: {
    _id: Id<"users">;
    name: string;
    image: string;
    isOnline: boolean;
  };
};

interface MessageContainerProps {
  selectedConversation: ConversationType;
}

export const MessageContainer = ({
  selectedConversation,
}: MessageContainerProps) => {
  const [open, setOpen] = useState("");

  const { toast } = useToast();
  const { setSelectedConversation } = useConversationStore();

  const createConversation = useMutation(api.conversations.createConversation);
  const kickUser = useMutation(api.conversations.kickUser);
  const messages = useQuery(api.messages.getMessages, {
    conversation: selectedConversation._id,
  });
  const me = useQuery(api.users.getMe);

  const handleCreateConversation = async (message: Message) => {
    if (!me) {
      return;
    }

    try {
      const conversationId = await createConversation({
        participants: [me._id, message.sender._id],
        isGroup: false,
      });

      setSelectedConversation({
        _id: conversationId,
        name: message.sender.name,
        participants: [me._id, message.sender._id],
        isGroup: false,
        isOnline: message.sender.isOnline,
        image: message.sender.image,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem to create the conversation.",
      });

      console.error(error);
    }
  };

  const handleKickUser = async (e: React.MouseEvent, message: Message) => {
    e.stopPropagation();

    try {
      await kickUser({
        conversationId: selectedConversation._id,
        userId: message.sender._id,
      });

      setSelectedConversation({
        ...selectedConversation,
        participants: selectedConversation.participants.filter(
          (id) => id !== message.sender._id
        ),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem to kick the user.",
      });

      console.error(error);
    }
  };

  return (
    <div className="relative p-3 flex-1 overflow-auto h-full bg-chat-tile-light dark:bg-chat-tile-dark overflow-x-hidden">
      <div className="mx-12 flex flex-col gap-3 h-full">
        {messages?.map((message, index) => {
          if (message.sender._id !== me?._id) {
            return (
              <Fragment key={message._id}>
                {(!messages[index - 1] ||
                  !isSameDay(
                    messages[index - 1]._creationTime,
                    message._creationTime
                  )) && (
                  <div className="flex justify-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 p-1 z-50 rounded-md bg-white dark:bg-gray-primary">
                      {getRelativeDateTime(message, messages[index - 1])}
                    </p>
                  </div>
                )}
                <div className="flex gap-1 w-1/2 last:pb-3">
                  {selectedConversation.isGroup && (
                    <Avatar className="overflow-visible relative">
                      {message.sender.isOnline &&
                        selectedConversation.participants.includes(
                          message.sender._id
                        ) && (
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
                      "flex flex-col z-20 px-2 pt-1 rounded-md shadow-md relative min-w-16",
                      message.sender._id === me?._id
                        ? "bg-green-chat"
                        : "bg-white dark:bg-gray-primary"
                    )}
                  >
                    <div className="absolute bg-white dark:bg-gray-primary top-0 -left-[4px] w-3 h-3 rounded-bl-full" />
                    {selectedConversation.isGroup && (
                      <div
                        className="text-xs flex gap-4 my-2 justify-between font-bold cursor-pointer group"
                        onClick={() => handleCreateConversation(message)}
                      >
                        {message.sender.name}
                        {!selectedConversation.participants.includes(
                          message.sender._id
                        ) && <Ban className="h-4 w-4 text-red-500" />}
                        {selectedConversation.participants.includes(
                          message.sender._id
                        ) &&
                          selectedConversation?.admin === me?._id && (
                            <LogOut
                              className="h-4 w-4 text-red-500 opacity-0 group-hover:opacity-100"
                              onClick={(e) => handleKickUser(e, message)}
                            />
                          )}
                      </div>
                    )}
                    {message.messageType === "text" &&
                      (/^(ftp|http|https):\/\/[^ "]+$/.test(message.content) ? (
                        <a
                          href={message.content}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mr-2 text-sm font-light text-blue-400 underline break-all"
                        >
                          {message.content}
                        </a>
                      ) : (
                        <p className="mr-2 text-sm font-light break-all">
                          {message.content}
                        </p>
                      ))}
                    {message.messageType === "image" && (
                      <div className="w-[250px] h-[250px] m-2 relative">
                        <Image
                          src={message.content}
                          fill
                          sizes="(max-width: 100vw) 100vw, 250px"
                          className="cursor-pointer object-cover rounded"
                          alt="Image"
                          onClick={() => setOpen(message.content)}
                        />
                      </div>
                    )}
                    {message.messageType === "video" && (
                      <ReactPlayer
                        url={message.content}
                        height="250px"
                        width="250px"
                        controls
                        light
                      />
                    )}
                    {open && (
                      <Dialog
                        open={!!open}
                        onOpenChange={(isOpen) => !isOpen && setOpen("")}
                      >
                        <DialogContent className="min-w-[750px]">
                          <DialogDescription className="relative h-[450px] flex justify-center">
                            <Image
                              src={open}
                              fill
                              sizes="(max-width: 100vw) 100vw, 250px"
                              className="rounded-lg object-contain"
                              alt="Image"
                            />
                          </DialogDescription>
                        </DialogContent>
                      </Dialog>
                    )}
                    <p className="text-[10px] ml-auto self-end flex gap-1 items-center pb-1">
                      {`${new Date(message._creationTime).getHours().toString().padStart(2, "0")}:${new Date(message._creationTime).getHours().toString().padStart(2, "0")}`}
                    </p>
                  </div>
                </div>
              </Fragment>
            );
          }

          return (
            <Fragment key={message._id}>
              {(!messages[index - 1] ||
                !isSameDay(
                  messages[index - 1]._creationTime,
                  message._creationTime
                )) && (
                <div className="flex justify-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 p-1 z-50 rounded-md bg-white dark:bg-gray-primary">
                    {getRelativeDateTime(message, messages[index - 1])}
                  </p>
                </div>
              )}
              <div className="flex gap-1 ml-auto text-wrap w-1/2 last:pb-3">
                <div
                  className={cn(
                    "flex z-20 max-w-fit  px-2 pt-1 rounded-md shadow-md ml-auto relative",
                    message.sender._id === me?._id
                      ? "bg-green-chat"
                      : "bg-white dark:bg-gray-primary"
                  )}
                >
                  <div className="absolute bg-green-chat top-0 -right-[3px] w-3 h-3 rounded-br-full overflow-hidden" />
                  {message.messageType === "text" &&
                    (/^(ftp|http|https):\/\/[^ "]+$/.test(message.content) ? (
                      <a
                        href={message.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-2 text-sm font-light text-blue-400 underline break-all"
                      >
                        {message.content}
                      </a>
                    ) : (
                      <p className="mr-2 text-sm font-light break-all">
                        {message.content}
                      </p>
                    ))}
                  {message.messageType === "image" && (
                    <div className="w-[250px] h-[250px] m-2 relative">
                      <Image
                        src={message.content}
                        fill
                        sizes="(max-width: 100vw) 100vw, 250px"
                        className="cursor-pointer object-cover rounded"
                        alt="Image"
                        onClick={() => setOpen(message.content)}
                      />
                    </div>
                  )}
                  {message.messageType === "video" && (
                    <ReactPlayer
                      url={message.content}
                      height="250px"
                      width="250px"
                      controls
                      light
                    />
                  )}
                  {open && (
                    <Dialog
                      open={!!open}
                      onOpenChange={(isOpen) => !isOpen && setOpen("")}
                    >
                      <DialogContent className="min-w-[750px]">
                        <DialogDescription className="relative h-[450px] flex justify-center">
                          <Image
                            src={open}
                            fill
                            sizes="(max-width: 100vw) 100vw, 250px"
                            className="rounded-lg object-contain"
                            alt="Image"
                          />
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  )}
                  <p className="text-[10px] mt-2 self-end flex gap-1 items-center pb-1">
                    {`${new Date(message._creationTime).getHours().toString().padStart(2, "0")}:${new Date(message._creationTime).getHours().toString().padStart(2, "0")}`}{" "}
                    {message.sender._id === me?._id && (
                      <CheckCheck className="h-4 w-4" />
                    )}
                  </p>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
