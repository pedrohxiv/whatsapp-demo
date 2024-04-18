export type ConversationType = {
  _id: string;
  admin: string | null;
  groupImage: string | null;
  groupName: string | null;
  participants: string[];
  _creationTime: number;
  lastMessage: MessageType;
  sender: string;
  isGroup: boolean;
  isOnline: boolean;
};

export type MessageType = {
  _id: string;
  content: string;
  sender: string;
  messageType: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  image: string;
  admin?: boolean;
  isOnline: boolean;
};
