import { useMutation, useQuery } from "convex/react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Laugh, Mic, Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useComponentVisible } from "@/hooks/use-component-visible";
import { useConversationStore } from "@/store/chat-store";

import { api } from "../../../../convex/_generated/api";

import { MediaDropdown } from "./media-dropdown";

export const MessageInput = () => {
  const [message, setMessage] = useState("");

  const { toast } = useToast();
  const { selectedConversation } = useConversationStore();
  const { ref, isVisible, setIsVisible } = useComponentVisible(false);

  const sendTextMessage = useMutation(api.messages.sendTextMessage);
  const me = useQuery(api.users.getMe);

  const handleSendTextMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message || !selectedConversation || !me) {
      return;
    }

    try {
      await sendTextMessage({
        content: message,
        conversation: selectedConversation._id,
        sender: me._id,
      });

      setMessage("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem to send the message.",
      });

      console.error(error);
    }
  };

  return (
    <div className="bg-gray-primary p-2 flex gap-4 items-center">
      <div className="relative flex gap-4 ml-4">
        <div
          onClick={() => setIsVisible(true)}
          ref={ref}
          className="cursor-pointer"
        >
          {isVisible && (
            <EmojiPicker
              theme={Theme.DARK}
              onEmojiClick={({ emoji }) => setMessage((prev) => prev + emoji)}
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1rem",
                zIndex: 50,
              }}
            />
          )}
          <Laugh className="text-gray-600 dark:text-gray-400" />
        </div>
        <MediaDropdown />
      </div>
      <form onSubmit={handleSendTextMessage} className="w-full flex gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="type a message"
            className="py-2 text-sm w-full rounded-lg shadow-sm bg-gray-tertiary focus-visible:ring-transparent"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="mr-4 flex items-center gap-3">
          {message.length > 0 ? (
            <Button
              type="submit"
              size="sm"
              className="bg-transparent text-foreground hover:bg-transparent"
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="sm"
              className="bg-transparent text-foreground hover:bg-transparent"
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
