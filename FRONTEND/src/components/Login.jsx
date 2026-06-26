import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("samv12761@gmail.com");
  const [password, setPassword] = useState("Sameer@kz0");
  const dispatch = useDispatch();
  const user = useSelector((store)=> store.user);
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL+"/login", {
        email: emailId,
        password: password,
      },{withCredentials:true});
      dispatch(addUser(res.data));
      navigate("/home")
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
    <div className="flex h-screen items-center justify-center">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login at DevMatch</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  value={emailId}
                  placeholder="Email"
                  onChange={(e) => setEmailId(e.target.value)}
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button onClick={handleLogin} className="btn btn-neutral mt-4">
                  Login
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </div>
    
  );
};

export default Login;
