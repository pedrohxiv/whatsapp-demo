import { Laugh, Mic, Plus, Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const MessageInput = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="bg-gray-primary p-2 flex gap-4 items-center">
      <div className="relative flex gap-4 ml-4">
        <Laugh className="text-gray-600 dark:text-gray-400" />
        <Plus className="text-gray-600 dark:text-gray-400" />
      </div>
      <form className="w-full flex gap-3">
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
