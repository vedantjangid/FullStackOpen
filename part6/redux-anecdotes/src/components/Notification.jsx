import { useSelector } from "react-redux";

const Notification = ({ notification }) => {
  // console.log(notifiaction);
  // console.log(notification.message);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <>
      <div>
        {notification.hidden ? null : (
          <p style={style}>{notification.message}</p>
        )}
      </div>
    </>
  );
};

export default Notification;
