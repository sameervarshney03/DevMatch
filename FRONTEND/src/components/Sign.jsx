import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Login from "./Login"
import { NavBar } from "./NavBar"

const Sign = () => {
  return (
    <div>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Sign