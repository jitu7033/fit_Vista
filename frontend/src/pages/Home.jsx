import React, { useEffect,useState } from "react";
import {Link} from "react-router-dom";
import Lottie from "lottie-react";
import gymAnimation from "./json/Animation - 1739817481336.json"; // Import your animation JSON
import "./Home.css";

const Home = () => {

  const [user,setUser] = useState(null);

  useEffect(() => { 
    const storeUser = localStorage.getItem("user");
    if(storeUser){
      setUser(JSON.parse(storeUser));
    }
  }, []); 

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };


  return (
    <div className="home-container">
      <header className="header">
        <h1 className="title">Welcome to Fitness Gym</h1>
        <p className="subtitle">Your journey to a healthier life starts here</p>

        {!user ? (
          <Link to={"/login"}>
            <button className="cta-button">Join Now</button>
          </Link>
        ) : (
          <Link to={"/landing"}>
          <button className="cta-button">Start Work Out</button>
          </Link>
        )}

      </header>

      <section className="features">
        <div className="feature">
          <h2>State-of-the-art Equipment</h2>
          <p>We provide the best equipment for all your fitness needs.</p>
        </div>
        <div className="feature">
          <h2>Professional Trainers</h2>
          <p>Our trainers are certified and experienced to help you achieve your goals.</p>
        </div>
        <div className="feature">
          <h2>Flexible Membership</h2>
          <p>Choose a membership plan that suits your schedule and budget.</p>
        </div>
      </section>

      {/* Gym Animation Section */}
      {/* <div className="gym-animation">
        <Lottie animationData={gymAnimation} loop={true} />
      </div> */}

      {/* Gym Animation Section */}
<div className="gym-animation">
  <Lottie animationData={gymAnimation} loop={true} style={{ width: 400, height: 400 }} />
</div>
      <footer className="footer">
        <p>&copy; 2023 Fitness Gym. All rights reserved.</p>
        <div className="social-media">
          <a href="#" className="social-link">Facebook</a>
          <a href="#" className="social-link">Twitter</a>
          <a href="#" className="social-link">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;