import { Id } from "../../convex/_generated/dataModel";

export type ConversationType = {
  _id: Id<"conversations">;
  tokenIdentifier?: string;
  name?: string;
  email?: string;
  image?: string;
  isOnline?: boolean;
  lastMessage: MessageType | null;
  isGroup: boolean;
  participants: Id<"users">[];
  admin?: string;
  groupName?: string;
  groupImage?: string;
  _creationTime: number;
};

export type MessageType = {
  _id: Id<"messages">;
  content: string;
  sender: string;
  messageType: "image" | "text" | "video";
  conversation: Id<"conversations">;
  _creationTime: number;
};

export type UserType = {
  _id: Id<"users">;
  tokenIdentifier: string;
  name?: string | undefined;
  email: string;
  image: string;
  isOnline: boolean;
  admin?: boolean;
  _creationTime: number;
};
