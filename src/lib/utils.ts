import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { MessageType } from "@/types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (date_ms: number) => {
  let date_seconds = date_ms / 1000;

  let date_obj = new Date(date_seconds * 1000);

  let current_date = new Date();
  current_date.setHours(0, 0, 0, 0);
  let current_time = current_date.getTime();

  let provided_date = new Date(date_obj);
  provided_date.setHours(0, 0, 0, 0);

  if (provided_date.getTime() === current_time) {
    return date_obj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  if (provided_date.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }

  if (provided_date.getDay() < current_date.getDay()) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[provided_date.getDay()];
  }

  return (
    provided_date.getMonth() +
    1 +
    "/" +
    provided_date.getDate() +
    "/" +
    provided_date.getFullYear()
  );
};

export const isSameDay = (timestamp1: number, timestamp2: number) => {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getRelativeDateTime = (
  message: MessageType,
  previousMessage: MessageType
) => {
  const today = new Date();
  const yesterday = new Date(today);
  const lastWeek = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const messageDate = new Date(message._creationTime);

  if (
    !previousMessage ||
    !isSameDay(previousMessage._creationTime, messageDate.getTime())
  ) {
    if (isSameDay(messageDate.getTime(), today.getTime())) {
      return "Today";
    } else if (isSameDay(messageDate.getTime(), yesterday.getTime())) {
      return "Yesterday";
    } else if (messageDate.getTime() > lastWeek.getTime()) {
      const options: Intl.DateTimeFormatOptions = { weekday: "long" };

      return messageDate.toLocaleDateString(undefined, options);
    } else {
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };

      return messageDate.toLocaleDateString(undefined, options);
    }
  }
};
