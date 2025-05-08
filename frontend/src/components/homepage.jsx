import React, { useEffect, useState } from "react";
import "./homepage.css";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";

const images = [image1, image3];

const Homepage = () => {
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container1">
      {/* Navbar */}
      <nav className="navbar1">
        <h1 className="logo1">EMS Portal</h1>
        <button className="menu-btn1" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <ul className={`nav-links1 ${menuOpen ? "active" : ""}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="/login" className="login">Login</a></li>
        </ul>
      </nav>

      {/* Home Section */}
      <section id="home" className="home-section1">
        <h2>Welcome to EMS Portal</h2>
        <p>Manage employees, tasks, and performance efficiently.</p>
      </section>

      {/* Image Slider (Fixed) */}
      <div className="image-slider1">
        <img src={images[index]} alt="Slideshow" className="moving-image1" />
      </div>

      {/* Features Section */}
      <section id="features" className="features-section1">
        <h2>Our Features</h2>
        <div className="features-grid1">
          <div className="feature-card1">
            <h3>Role-based Access</h3>
            <p>Admin, Manager & Employee roles with custom access.</p>
          </div>
          <div className="feature-card1">
            <h3>Task & Performance Tracking</h3>
            <p>Monitor tasks and analyze team productivity.</p>
          </div>
          <div className="feature-card1">
            <h3>Secure & Scalable</h3>
            <p>Industry-standard security and cloud-based access.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer1">
        <p>&copy; 2025 EMS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
