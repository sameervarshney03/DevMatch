import React from "react";

const UserCard = ({user, onAction}) => {
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm hover:shadow-blue-50 hover:ring-offset-blue-50">
        <figure>
          <img
            src={user.photourl}
            alt="User Avatar"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center pb-1">{user.firstName} {user.lastName}</h2>
          {(user.age || user.country) && (
            <p className="text-center text-sm text-gray-500 mb-2">
              {user.age && <span>{user.age} years old</span>}
              {user.age && user.country && <span>, </span>}
              {user.country && <span>{user.country}</span>}
            </p>
          )}
          {user.about && <p className="text-sm mb-2">{user.about}</p>}
          {user.skills && user.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {user.skills.map((skill, index) => (
                <div key={index} className="badge badge-secondary">{skill}</div>
              ))}
            </div>
          )}
          <div className="card-actions justify-between mt-auto">
            <button 
              className="btn text-black bg-gray-400"
              onClick={() => onAction && onAction("skipped")}
            >
              Ignore
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => onAction && onAction("requested")}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
