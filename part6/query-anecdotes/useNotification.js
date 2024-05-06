// useNotification.js
import { useContext } from "react";
import { NotificationContext } from "./notificationContext";

const useNotification = () => {
  const { message, messageDispatch } = useContext(NotificationContext);
  if (!messageDispatch) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return { message, messageDispatch };
};

export default useNotification;
