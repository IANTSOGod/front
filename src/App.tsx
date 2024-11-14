import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/signUp" element={<SignUp></SignUp>}></Route>
    </Routes>
  );
}
