import { NavBar } from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedStore";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data?.users));
    } catch (err) {
      console.log(err);
    }
  };

  const handleConnection = async (status, _id) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, {
        withCredentials: true,
      });
      
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length <= 0) return (
    <div className="min-h-screen flex flex-col justify-between">
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold">No new users found!</h1>
        <p className="mt-4 text-gray-500">Check back later for more developers.</p>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <NavBar />
      <div className="flex-grow flex items-center justify-center p-4">
        <UserCard 
          user={feed[0]} 
          onAction={(status) => handleConnection(status, feed[0]._id)} 
        />
      </div>
      <Footer />
    </div>
  );
};

export default Feed;
