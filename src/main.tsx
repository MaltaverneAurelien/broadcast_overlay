import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;

const app = ReactDOM.createRoot(root);

app.render(<App />);