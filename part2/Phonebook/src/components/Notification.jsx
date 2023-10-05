function Notification({ message }) {
  if (!message) {
    return null;
  }
  return <div className="succsess">{message}</div>;
}

export default Notification;
