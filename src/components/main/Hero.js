import React from "react";
// import bootstrap
import Jumbotron from "react-bootstrap/Jumbotron";

const Hero = ({ bgimg, logo }) => {
  return (
    <Jumbotron
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        opacity: 0.5,
        height: "500px"
      }}
    >
      <h1 className="hero-logo">{logo}</h1>
      <p className="hero-paragraph">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus labore
        obcaecati explicabo exerci
      </p>
    </Jumbotron>
  );
};

export default Hero;
