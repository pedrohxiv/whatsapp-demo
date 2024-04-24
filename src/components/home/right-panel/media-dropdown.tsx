import { useMutation, useQuery } from "convex/react";
import { ImageIcon, Plus, VideoIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useConversationStore } from "@/store/chat-store";

import { api } from "../../../../convex/_generated/api";

export const MediaDropdown = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [renderedImage, setRenderedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { selectedConversation } = useConversationStore();

  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.conversations.generateUploadUrl);
  const sendImage = useMutation(api.messages.sendImage);
  const sendVideo = useMutation(api.messages.sendVideo);
  const me = useQuery(api.users.getMe);

  const renderedVideo = URL.createObjectURL(
    new Blob([selectedVideo!], { type: "video/mp4" })
  );

  const handleSendImage = async () => {
    if (!selectedImage || !selectedConversation || !me) {
      return;
    }

    setIsLoading(true);

    try {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage.type },
        body: selectedImage,
      });

      const { storageId } = await result.json();

      await sendImage({
        conversation: selectedConversation._id,
        imageId: storageId,
        sender: me._id,
      });

      setSelectedImage(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem to send the image.",
      });

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVideo = async () => {
    if (!selectedVideo || !selectedConversation || !me) {
      return;
    }

    setIsLoading(true);

    try {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedVideo.type },
        body: selectedVideo,
      });

      const { storageId } = await result.json();

      await sendVideo({
        conversation: selectedConversation._id,
        videoId: storageId,
        sender: me._id,
      });

      setSelectedVideo(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem to send the video.",
      });

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => setRenderedImage(e.target?.result as string);
    reader.readAsDataURL(selectedImage);
  }, [selectedImage]);

  return (
    <>
      <input
        type="file"
        ref={imageRef}
        accept="image/*"
        onChange={(e) => setSelectedImage(e.target.files![0])}
        hidden
      />
      <input
        type="file"
        ref={videoRef}
        accept="video/mp4"
        onChange={(e) => setSelectedVideo(e.target.files![0])}
        hidden
      />
      {selectedImage && (
        <Dialog
          open={selectedImage !== null}
          onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}
        >
          <DialogContent>
            <div className="flex flex-col gap-10 justify-center items-center">
              {renderedImage && (
                <Image
                  src={renderedImage}
                  width={300}
                  height={300}
                  alt="Selected Image"
                  className="my-2"
                />
              )}
              <Button
                className="w-full"
                disabled={isLoading}
                onClick={handleSendImage}
              >
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {selectedVideo && (
        <Dialog
          open={selectedVideo !== null}
          onOpenChange={(isOpen) => !isOpen && setSelectedVideo(null)}
        >
          <DialogContent>
            <div className="flex flex-col gap-10 justify-center items-center">
              {renderedVideo && (
                <div className="w-full">
                  <ReactPlayer url={renderedVideo} controls width="100%" />
                </div>
              )}
              <Button
                className="w-full"
                disabled={isLoading}
                onClick={handleSendVideo}
              >
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Plus className="text-gray-600 dark:text-gray-400 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => imageRef.current?.click()}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Photo
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => videoRef.current?.click()}
          >
            <VideoIcon className="h-4 w-4 mr-2" />
            Video
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
