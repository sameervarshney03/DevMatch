import { NavBar } from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
        <Outlet></Outlet>
    </div>
  )
}

export default Body;