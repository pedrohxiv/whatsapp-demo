export type ConversationType = {
  _id: string;
  admin: string | null;
  groupImage: string | null;
  groupName: string | null;
  participants: string[];
  _creationTime: number;
  lastMessage: {
    _id: string;
    messageType: string;
    content: string;
    sender: string;
  };
  sender: string;
  isGroup: boolean
  isOnline: boolean;
};
