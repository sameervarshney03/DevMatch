import {NavBar} from "./components/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Body from "./components/Body"; 
import Login from "./components/Login";
import Signup from "./components/Signup";
import Sign from "./components/Sign";
import appStore from "./utils/appStore";
import {Provider} from "react-redux";
import Feed from "./components/Feed";

function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
        <Route path="/" element={<Feed/>}></Route>
        <Route path="/home" element={<Feed></Feed>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
