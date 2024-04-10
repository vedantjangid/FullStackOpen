// main.js
import { createRoot } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
