import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    country: "India",
    skills: "",
    photourl: "",
    about: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
        country: user.country || "India",
        skills: user.skills ? user.skills.join(", ") : "",
        photourl: user.photourl || "",
        about: user.about || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const skillsArray = formData.skills
        ? formData.skills.split(",").map(skill => skill.trim()).filter(Boolean)
        : [];

      const dataToSubmit = {
        ...formData,
        skills: skillsArray,
      };
      
      if (dataToSubmit.age) {
         dataToSubmit.age = Number(dataToSubmit.age);
      } else {
         delete dataToSubmit.age;
      }

      const res = await axios.patch(BASE_URL + "/profile/update", dataToSubmit, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.user));
      setSuccess("Profile updated successfully!");
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  const previewUser = {
    ...user,
    ...formData,
    skills: formData.skills
        ? formData.skills.split(",").map(skill => skill.trim()).filter(Boolean)
        : [],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex flex-col lg:flex-row justify-center items-start py-8 px-4 gap-8">
        
        <div className="card bg-base-300 w-full max-w-md shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-4">Edit Profile</h2>
            
            {error && <div className="alert alert-error mb-4">{error}</div>}
            {success && <div className="alert alert-success mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">First Name</span></label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input input-bordered w-full" required />
              </div>
              
              <div className="form-control">
                <label className="label"><span className="label-text">Last Name</span></label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input input-bordered w-full" />
              </div>

              <div className="flex gap-4">
                <div className="form-control w-1/2">
                  <label className="label"><span className="label-text">Age</span></label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="input input-bordered w-full" />
                </div>
                
                <div className="form-control w-1/2">
                  <label className="label"><span className="label-text">Country</span></label>
                  <select name="country" value={formData.country} onChange={handleChange} className="select select-bordered w-full">
                    <option value="India">India</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Photo URL</span></label>
                <input type="url" name="photourl" value={formData.photourl} onChange={handleChange} className="input input-bordered w-full" />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Skills (comma separated)</span></label>
                <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="input input-bordered w-full" />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">About</span></label>
                <textarea name="about" value={formData.about} onChange={handleChange} className="textarea textarea-bordered w-full h-24" />
              </div>

              <div className="form-control mt-4">
                <button type="submit" className="btn btn-primary w-full text-white">Save Changes</button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full max-w-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
            <UserCard user={previewUser} />
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Profile;