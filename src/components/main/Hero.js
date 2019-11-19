import React from "react";
// import bootstrap

const Hero = ({ bgimg }) => {
  return (
    <div className="home-image-div">
      <img className="home-image-img" src={bgimg} alt="" />
    </div>
  );
};

export default Hero;
