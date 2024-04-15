import { ChatBubble } from "@/components/home/chat-bubble";
import { messages } from "@/lib/data";

export const MessageContainer = () => {
  return (
    <div className="relative p-3 flex-1 overflow-auto h-full bg-chat-tile-light dark:bg-chat-tile-dark">
      <div className="mx-12 flex flex-col gap-3 h-full">
        {messages.map((message, index) => (
          <div>
            <ChatBubble key={message._id} />
          </div>
        ))}
      </div>
    </div>
  );
};
