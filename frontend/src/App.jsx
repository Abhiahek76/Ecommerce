import Router from "./router/Router.jsx";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router />
    </>
  );
}

export default App;
