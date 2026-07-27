import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailId, setEmailId] = useState("sample14@gmail.com");
  const [password, setPassword] = useState("Sample@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      setErrorMessage("");
      if (isLogin) {
        const res = await axios.post(BASE_URL + "/login", {
          email: emailId,
          password: password,
        }, { withCredentials: true });
        dispatch(addUser(res.data));
        navigate("/home");
      } else {
        const res = await axios.post(BASE_URL + "/signup", {
          firstName,
          lastName,
          email: emailId,
          password: password,
        }, { withCredentials: true });
        dispatch(addUser(res.data));
        navigate("/profile");
      }
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something went wrong! Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex h-screen items-center justify-center">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left p-8">
              <h1 className="text-5xl font-bold">{isLogin ? "Login to DevMatch" : "Join DevMatch"}</h1>
              <p className="py-6 max-w-md text-lg">
                {isLogin ? "Welcome back! Log in to connect with other developers and see your feed." : "Connect with other developers easily. Create your account and set up your profile!"}
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <fieldset className="fieldset flex flex-col gap-2">
                  {!isLogin && (
                    <>
                      <label className="label">First Name</label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={firstName}
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <label className="label">Last Name</label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </>
                  )}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    value={emailId}
                    placeholder="Email"
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  
                  {isLogin && (
                    <div>
                      <a className="link link-hover text-sm">Forgot password?</a>
                    </div>
                  )}

                  {errorMessage && <p className="text-red-600 dark:text-red-500 text-sm mt-2">{errorMessage}</p>}
                  
                  <button onClick={handleAuth} className="btn btn-neutral mt-4 w-full">
                    {isLogin ? "Login" : "Sign Up"}
                  </button>

                  <p className="text-center text-sm mt-4 cursor-pointer underline underline-offset-2 hover:decoration-2 hover:decoration-emerald-800" onClick={() => {
                    setIsLogin(!isLogin);
                    setErrorMessage("");
                  }}>
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                  </p>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
