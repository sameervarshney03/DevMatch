import axios from "axios";
import Footer from "./Footer";
import { NavBar } from "./NavBar";
import { BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request);
    const [alertMessage, setAlertMessage] = useState(null);

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests", {
                withCredentials: true,
            });
            dispatch(addRequests(res.data.requests));
        } catch (err) {
            console.log(err.message);
        }
    };

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {
                withCredentials: true,
            });
            
            dispatch(removeRequest(_id));
            
            const actionText = status === "accepted" ? "accepted" : "rejected";
            setAlertMessage(`You have ${actionText} the request!`);
            
            setTimeout(() => {
                setAlertMessage(null);
            }, 3000);

        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return null;

    return (
        <div className="min-h-screen flex flex-col relative">
            <NavBar />
            
            {alertMessage && (
                <div className="toast toast-top toast-center z-50">
                    <div className="alert alert-success shadow-lg">
                        <div>
                            <span>{alertMessage}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-grow flex flex-col items-center p-8 gap-4">
                <h1 className="text-3xl font-bold mb-4">Connection Requests</h1>
                
                {requests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-20">
                        <h2 className="text-2xl font-semibold text-gray-500">
                            No Pending Requests Found
                        </h2>
                    </div>
                ) : (
                    requests.map((request) => {
                        const { _id, fromUser } = request;
                        if (!fromUser) return null; 
                        
                        return (
                            <div key={_id} className="card card-side bg-base-300 w-full max-w-2xl shadow-xl p-4">
                                <figure>
                                    <img
                                        className="w-24 h-24 rounded-full object-cover"
                                        src={fromUser.photourl}
                                        alt="User Avatar"
                                    />
                                </figure>
                                <div className="card-body flex-row justify-between items-center py-0 pr-0">
                                    <div>
                                        <h2 className="card-title text-xl">{fromUser.firstName} {fromUser.lastName}</h2>
                                        {fromUser.age && fromUser.country && <p className="text-sm text-gray-500">{fromUser.age} years old, {fromUser.country}</p>}
                                        <p className="text-sm">{fromUser.about}</p>
                                    </div>
                                    <div className="card-actions flex flex-col md:flex-row gap-2">
                                        <button 
                                            className="btn btn-error text-white"
                                            onClick={() => reviewRequest("rejected", _id)}
                                        >
                                            Reject
                                        </button>
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => reviewRequest("accepted", _id)}
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Requests;