import React from "react";
import logo from "../assest/logo.avif";

const Logo = ({ w, h }) => {
  return (
    <div>
      <img src={logo} alt="Logo" width={w} height={h} />
    </div>
  );
};

export default Logo;
