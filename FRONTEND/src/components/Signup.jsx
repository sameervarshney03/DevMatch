import Footer from "./Footer";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">DevMatch here and You?</h1>
            <p className="py-6">
                Connect to other developers easily. Signup fast!
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Signup;
