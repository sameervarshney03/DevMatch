
import React from 'react';

import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen hero bg-base-200 font-sans px-4">
      <div className="hero-content text-center">
        <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300 p-8 items-center">
          
          <div className="badge badge-warning badge-outline gap-2 font-semibold uppercase tracking-wider text-xs px-3 py-3">
            <svg 
              xmlns="http://w3.org" 
              fill="none" 
              viewBox="0 0 24 24" 
              className="stroke-current flex-shrink-0 w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Access Denied
          </div>

          <div className="mt-4">
            <h1 className="text-3xl font-black tracking-tight text-base-content sm:text-4xl">
              Authentication Required
            </h1>
            <p className="mt-3 text-sm text-base-content/70 leading-relaxed max-w-sm">
              You are trying to access a secure home dashboard. Please sign in to verify your account session.
            </p>
          </div>

          <div className="w-full mt-8 flex flex-col gap-3">
            <button 
              onClick={handleLoginRedirect}
              className="btn btn-primary w-full text-base normal-case"
            >
              Sign In to Your Account
            </button>
            
            <a 
              href="/help"
              className="btn btn-outline btn-ghost w-full text-base normal-case"
            >
              Contact Support
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
