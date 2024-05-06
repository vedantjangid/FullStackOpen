import { useContext } from "react";
import notificationContext from "../notificationContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  // if (true) return null;

  const [message] = useContext(notificationContext);

  return <>{message.length > 1 ? <div style={style}>{message}</div> : null}</>;
};

export default Notification;
