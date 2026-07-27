import {NavBar} from "./components/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Body from "./components/Body"; 
import Login from "./components/Login";
import Signup from "./components/Signup";
import Sign from "./components/Sign";
import appStore from "./utils/appStore";
import {Provider} from "react-redux";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
        <Route path="/" element={<Feed/>}></Route>
        <Route path="/home" element={<Feed></Feed>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Login></Login>}></Route>
        <Route path="/connections" element={<Connections></Connections>}></Route>
        <Route path="/requests" element={<Requests></Requests>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
