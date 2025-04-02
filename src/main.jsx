import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Parse from "parse/dist/parse.js";
import App from "./App.jsx";
import "./index.css";

// redux
import { Provider } from "react-redux";

// store
import store from "./app/store.js";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "cyCKVShT1mBkI7tulQU8NYZoSyHKisMM9t7X7JbI";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "9SaAlRUukpsLgSh5oE0tU432VLbX6zzjSKkjUXSh";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
