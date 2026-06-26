import { Outlet } from "react-router-dom"
import { NavBar } from "./NavBar"
import Footer from "./Footer"

const Feed = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Feed