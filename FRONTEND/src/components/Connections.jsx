import { useEffect, useState } from "react";
import Footer from "./Footer";
import { NavBar } from "./NavBar";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, removeConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [alertMsg, setAlertMsg] = useState("");

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.connections));
    } catch (err) {
      console.log(err?.response?.data || err.message);
    }
  };

  const handleRemoveConnection = async (userId) => {
    try {
      await axios.post(
        BASE_URL + "/user/connection/remove/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeConnection(userId));
      setAlertMsg("Connection removed successfully!");
      setTimeout(() => {
        setAlertMsg("");
      }, 3000);
    } catch (err) {
      console.log(err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <NavBar />

      <div className="flex-grow p-8 max-w-4xl mx-auto w-full relative">
        {alertMsg && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert alert-success shadow-lg">
              <div>
                <span>{alertMsg}</span>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-8 text-center">Your Connections</h1>

        {connections.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <h2 className="text-2xl font-semibold text-gray-500">
              You don't have any connections yet.
            </h2>
            <p className="mt-2 text-gray-400">Head over to your feed to meet developers!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {connections.map((user) => (
              <div key={user._id} className="card bg-base-200 shadow-xl flex-row items-center p-4 h-40">
                <figure className="w-24 h-24 rounded-full overflow-hidden shrink-0 ml-2">
                  <img src={user.photourl} alt="User Avatar" className="w-full h-full object-cover" />
                </figure>
                <div className="card-body p-4 justify-between flex-row w-full items-center">
                  <div className="flex-1 overflow-hidden">
                    <h2 className="card-title text-lg truncate">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-sm text-gray-400 truncate">
                      {user.age && `${user.age} years, `}
                      {user.country}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                      {user.about}
                    </p>
                  </div>
                  <div className="card-actions shrink-0">
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleRemoveConnection(user._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Connections;