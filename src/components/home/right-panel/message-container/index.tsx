import { messages } from "@/lib/data";

import { ChatBubble } from "./chat-bubble";

export const MessageContainer = () => {
  return (
    <div className="relative p-3 flex-1 overflow-auto h-full bg-chat-tile-light dark:bg-chat-tile-dark">
      <div className="mx-12 flex flex-col gap-3 h-full">
        {messages.map((message, index) => (
          <div>
            <ChatBubble key={index} />
          </div>
        ))}
      </div>
    </div>
  );
};
