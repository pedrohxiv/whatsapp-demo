"use client";

import { UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ListFilter, Search } from "lucide-react";

import { ThemeSwitch } from "@/components/theme-switch";
import { Input } from "@/components/ui/input";
import { conversations } from "@/lib/data";

import { Conversation } from "./conversation";
import { UserListDialog } from "./user-list-dialog";

export const LeftPanel = () => {
  const { isAuthenticated } = useConvexAuth();

  return (
    <div className="w-1/4 border-gray-600 border-r">
      <div className="sticky top-0 bg-left-panel z-10">
        <div className="flex justify-between bg-gray-primary p-3 items-center">
          <div className="flex flex-1 items-center justify-start">
            <UserButton />
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated && <UserListDialog />}
            <ThemeSwitch />
          </div>
        </div>
        <div className="p-3 flex items-center">
          <div className="relative h-10 mx-3 flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
            <Input
              type="text"
              placeholder="Search or start a new chat"
              className="pl-10 py-2 text-sm w-full rounded shadow-sm bg-gray-primary focus-visible:ring-transparent"
            />
          </div>
          <ListFilter className="cursor-pointer" />
        </div>
      </div>
      <div className="my-3 flex flex-col gap-0 max-h-[80%] overflow-auto">
        {conversations.length === 0 && (
          <>
            <p className="text-center text-gray-500 text-sm mt-3">
              No conversations yet.
            </p>
          </>
        )}
        {conversations.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
};
