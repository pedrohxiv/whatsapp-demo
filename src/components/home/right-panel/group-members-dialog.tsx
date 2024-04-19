import { useQuery } from "convex/react";
import { Crown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConversationType } from "@/types";

import { api } from "../../../../convex/_generated/api";

interface GroupMembersDialogProps {
  selectedConversation: ConversationType;
}

export const GroupMembersDialog = ({
  selectedConversation,
}: GroupMembersDialogProps) => {
  const groupMembers = useQuery(api.users.getGroupMembers, {
    conversationId: selectedConversation._id,
  });

  if (!groupMembers) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-xs text-muted-foreground text-left">See members</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-2">Current Members</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-3">
              {groupMembers.map((groupMember) => (
                <div
                  key={groupMember._id}
                  className="flex gap-3 items-center p-2 rounded"
                >
                  <Avatar className="overflow-hidden p-1">
                    {groupMember.isOnline && (
                      <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2" />
                    )}
                    <AvatarImage
                      src={groupMember.image}
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback>
                      <div className="animate-pulse bg-gray-tertiary w-full h-full rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      <h3 className="text-md font-medium">
                        {groupMember.name || groupMember.email.split("@")[0]}
                      </h3>
                      {groupMember._id === selectedConversation.admin && (
                        <Crown className="h-4 w-4 text-yellow-400" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
